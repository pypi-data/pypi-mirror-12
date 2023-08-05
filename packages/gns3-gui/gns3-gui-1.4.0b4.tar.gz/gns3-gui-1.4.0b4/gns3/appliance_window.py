#!/usr/bin/env python
#
# Copyright (C) 2015 GNS3 Technologies Inc.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


import jinja2
import os
import sys

from .qt import QtCore, QtWidgets, QtWebKit, QtWebKitWidgets, QtGui
from .utils.get_resource import get_resource
from .utils.wait_for_lambda_worker import WaitForLambdaWorker
from .utils.progress_dialog import ProgressDialog
from .utils.server_select import server_select
from .utils import human_filesize
from .ui.appliance_window_ui import Ui_ApplianceWindow
from .image_manager import ImageManager
from .registry.appliance import Appliance, ApplianceError
from .registry.registry import Registry
from .registry.config import Config, ConfigException
from .registry.image import Image


import logging
log = logging.getLogger(__name__)


class ApplianceWindow(QtWidgets.QWidget, Ui_ApplianceWindow):
    update_html_signal = QtCore.Signal(str)

    def __init__(self, path, parent=None):
        super().__init__(parent)
        self.setupUi(self)
        self.setWindowTitle(path)

        self._path = path

        # Call linkClickedSlot() for all non local links
        self.uiWebView.page().setLinkDelegationPolicy(QtWebKitWidgets.QWebPage.DelegateExternalLinks)
        self.uiWebView.linkClicked.connect(self._linkClickedSlot)

        # Expose JavaScript objects
        self.uiWebView.page().mainFrame().javaScriptWindowObjectCleared.connect(self.javaScriptWindowObject)

        # Enable the inspector on right click
        #self.uiWebView.settings().setAttribute(QtWebKit.QWebSettings.DeveloperExtrasEnabled, True)

        self.update_html_signal.connect(self._updateHTMLSlot)

        self.show()

        self._refresh()


    def _refresh(self):
        worker = WaitForLambdaWorker(lambda: self._loadPage(), allowed_exceptions=[ApplianceError])
        progress_dialog = ProgressDialog(worker, "Add appliance", "Scanning directories for images...", None, busy=True, parent=self)
        progress_dialog.show()

    def _loadPage(self):
        """
        Scan user directory and build the web page.
        """
        renderer = jinja2.Environment(loader=jinja2.FileSystemLoader(get_resource('static')))
        renderer.filters['nl2br'] = lambda s: s.replace('\n', '<br />')
        renderer.filters['human_filesize'] = human_filesize
        template = renderer.get_template("appliance.html")

        images_directories = list()
        images_directories.append(os.path.join(ImageManager.instance().getDirectory(), "QEMU"))
        images_directories.append(os.path.dirname(self._path))
        download_directory = QtCore.QStandardPaths.writableLocation(QtCore.QStandardPaths.DownloadLocation)
        if download_directory != "" and download_directory != os.path.dirname(self._path):
            images_directories.append(download_directory)
        registry = Registry(images_directories)

        try:
            self._appliance = Appliance(registry, self._path)
        except ApplianceError as e:
            self.close()
            raise e

        self.update_html_signal.emit(template.render(appliance=self._appliance, registry=registry))

    def _updateHTMLSlot(self, html):
        """
        Slot allowing to update the content of the webview
        """
        self.uiWebView.setHtml(html)

    def javaScriptWindowObject(self):
        frame = self.uiWebView.page().mainFrame()
        frame.addToJavaScriptWindowObject('gns3', self)

    def _linkClickedSlot(self, url):
        """
        Open in a new browser other url
        """
        log.debug("Open %s in a browser", url.toString())
        QtGui.QDesktopServices.openUrl(url)

    #
    # Public Javascript methods
    #
    @QtCore.pyqtSlot()
    def refresh(self):
        """
        Refresh page
        """
        self._refresh()

    @QtCore.pyqtSlot(str)
    def install(self, version):
        """
        Install an appliance based on appliance version

        :param version: Version to install
        """

        try:
            config = Config()
        except OSError as e:
            QtWidgets.QMessageBox.critical(self.parent(), "Add appliance", str(e))
            self.close()
            return

        appliance_configuration = self._appliance.search_images_for_version(version)

        try:
            allow_local_server = not (sys.platform.startswith("darwin") or sys.platform.startswith("win"))
            server = server_select(self.parent(), allow_local_server=allow_local_server)
        except ValueError:
            QtWidgets.QMessageBox.critical(self.parent(), "Add appliance", "In order to use a GNS3a file you need the GNS3VM or a remote server for Mac and Windows.")
            self.close()
            return
        if server is None:
            return

        self.close()

        if server.isLocal():
            server_string = "local"
        elif server.isGNS3VM():
            server_string = "vm"
        else:
            server_string = server.url()

        worker = WaitForLambdaWorker(lambda: config.add_appliance(appliance_configuration, server_string), allowed_exceptions=[ConfigException, OSError])
        progress_dialog = ProgressDialog(worker, "Add appliance", "Install the appliance...", None, busy=True, parent=self)
        progress_dialog.show()
        if not progress_dialog.exec_():
            return

        worker = WaitForLambdaWorker(lambda: config.save(), allowed_exceptions=[ConfigException, OSError])
        progress_dialog = ProgressDialog(worker, "Add appliance", "Install the appliance...", None, busy=True, parent=self)
        progress_dialog.show()
        if progress_dialog.exec_():
            QtWidgets.QMessageBox.information(self.parent(), "Add appliance", "{} {} installed!".format(self._appliance["name"], version))

    @QtCore.pyqtSlot(str, str)
    def importAppliance(self, filename, md5sum):
        path, _ = QtWidgets.QFileDialog.getOpenFileName()
        if len(path) == 0:
            return

        md5 = Image(path).md5sum
        if md5 != md5sum:
            QtWidgets.QMessageBox.warning(self.parent(), "Add appliance", "This is not the correct image file.")
            return

        config = Config()
        #TODO: ASK for VM type
        worker = WaitForLambdaWorker(lambda: config.import_image(path), allowed_exceptions=[ApplianceError])
        progress_dialog = ProgressDialog(worker, "Add appliance", "Import the appliance...", None, busy=True, parent=self)
        if not progress_dialog.exec_():
            return
        self._refresh()
