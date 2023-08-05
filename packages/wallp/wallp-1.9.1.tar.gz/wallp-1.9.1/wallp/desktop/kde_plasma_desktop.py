import os
import dbus
from time import sleep
from tempfile import NamedTemporaryFile

from mutils.system import sys_command

from ..util.logger import log
from .desktop import Desktop
from .wpstyle import WPStyle
from .linux_desktop_helper import get_desktop_size, uses_dbus


#js execution + xdotool approach used from: http://blog.zx2c4.com/699 (Jason A. Donenfeld)

'''
wallpaperposition values:
0: 'Scaled'
1: 'Centered'
2: 'Scaled & Cropped'
3: 'Tiled'
4: 'Center Tiled'
5: 'Scaled, keep proportions'
'''

class KdePlasmaDesktop(Desktop):
	wp_styles = {
		WPStyle.NONE : 		'1',
		WPStyle.TILED : 	'3',
		WPStyle.CENTERED : 	'1',
		WPStyle.SCALED : 	'5',
		WPStyle.STRETCHED : 	'0',
		WPStyle.ZOOM : 		'5'
	}

	@staticmethod
	def supports(gdmsession):
		return gdmsession == 'kde-plasma'


	@uses_dbus
	def get_size(self):
		return get_desktop_size()


	def make_js(self, path=None, style=None):
		js = 	"var activity = activities()[0];" + os.linesep + \
			"activity.currentConfigGroup = new Array(\"Wallpaper\", \"image\");" + os.linesep

		if path is not None:
			js += 	"var wallpaper = \"%s\";"%path + os.linesep + \
				"activity.writeConfig(\"wallpaper\", wallpaper);" + os.linesep + \
				"activity.writeConfig(\"userswallpaper\", wallpaper);" + os.linesep

		if style is not None:
			js +=	"activity.writeConfig(\"wallpaperposition\", %s);"%style + os.linesep

		js += "activity.reloadConfig();"

		return js


	@uses_dbus
	def execute_js(self, js):
		plasma_app = dbus.SessionBus().get_object('org.kde.plasma-desktop', '/App')
		plasma_app_iface = dbus.Interface(plasma_app, 'local.PlasmaApp')
		
		temp_file = NamedTemporaryFile()
		temp_file.file.write(js)
		temp_file.file.flush()

		plasma_app_iface.loadScriptInInteractiveConsole(temp_file.name)

		xdo_cmd = "xdotool search --name \"Desktop Shell Scripting Console\" " + \
				"windowsize 200 200 key \"ctrl+e\" key \"ctrl+w\" windowminimize"

		rc, _ = sys_command(xdo_cmd, supress_output=True)


	def get_style_code(self, style):
		style_code = None

		if style is None:
			style_code = self.wp_styles['none']
		elif style not in self.wp_styles.keys():
			log.warning('wallpaper style %s is not supported, setting to none'%style)
			style_code = self.wp_styles['none']
		else:
			style_code = self.wp_styles[style]

		return style_code

	
	def set_wallpaper(self, filepath, style=None):
		style_code = self.get_style_code(style)	
		js = self.make_js(filepath, style_code)
		self.execute_js(js)
		
	
	def set_wallpaper_style(self, style):
		style_code = self.get_style_code(style)	
		js = self.make_js(None, style_code)
		self.execute_js(js)

