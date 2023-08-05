from struct import pack
from random import choice
from os.path import join as joinpath
from zope.interface import implementer
import tempfile
import os

from mutils.misc.colors import colors

from ..util.logger import log
from ..desktop import get_desktop
from .service import IImageGenService, ServiceError
from .image_info_mixin import ImageInfoMixin


@implementer(IImageGenService)
class Bitmap(ImageInfoMixin):
	name = 'bitmap'

	def __init__(self, use_color_table=True):
		self._use_color_table = use_color_table
		super(Bitmap, self).__init__()


	def get_extension(self):
		return 'bmp'


	def get_image(self, query=None, color=None):
		width, height = 2, 2

		if color is not None:
			self.add_trace_step('preferred color', color)
			if not color.startswith('0x'):
				c = colors.get(color)
				if c is None:
					print('no such color')
					raise ServiceError()
				color = c

		else:
			color = choice(list(colors.keys()))
			self.add_trace_step('random color', color)
			color = colors[color]


		fn, temp_file_path = tempfile.mkstemp()
		f = os.fdopen(fn, 'wb')
		try:
			pa_size, _ = self.get_pixel_array_size(width, height)
			self.write_bmp_header(f, pa_size)
			self.write_dib_header(f, width, height)
			self.write_pixel_array(f, width, height, color)
		except IOError as e:
			log.error(str(e))
			raise ServiceError()

		f.close()
		self.add_trace_step('generated bitmap', None)

		return temp_file_path


	def write_bmp_header(self, bmpfile, pa_size):
		bmpfile.write(b'BM')			#ID
		bmpfile.write(pack('i', 54 + pa_size))	#size
		bmpfile.write(pack('i', 0))		#unused
		bmpfile.write(pack('i', 54))		#offset for pixel array


	def write_dib_header(self, bmpfile, width, height):
		bmpfile.write(pack('i', 40))		#DIB header size
		bmpfile.write(pack('i', width))		#width of bitmap
		bmpfile.write(pack('i', height))	#height of bitmap
		bmpfile.write(pack('h', 1))		#no. of color planes
		bmpfile.write(pack('h', 24))		#no. of bits/pixel
		bmpfile.write(pack('i', 0))		#BI_RGB
		pa_size, _ = self.get_pixel_array_size(width, height)
		bmpfile.write(pack('i', pa_size))	#size of raw bitmap data
		bmpfile.write(pack('i', 2835))		#72dpi
		bmpfile.write(pack('i', 2835))		#72dpi
		bmpfile.write(pack('i', 0))		#no. of colors in the palette
		bmpfile.write(pack('i', 0))		#all colors are important

	
	def write_pixel_array(self, bmpfile, width, height, color):
		_, row_size = self.get_pixel_array_size(width, height)
		pixels_per_row = int(row_size / 3)
		pad_bytes = row_size - (pixels_per_row * 3)

		hex_color = int(color, 16)
		red = hex_color >> 16
		green = hex_color >> 8 & 0x00FF
		blue = hex_color & 0x0000FF

		for p in range(0, width * height, pixels_per_row):
			for i in range(pixels_per_row):
				bmpfile.write(pack('BBB', blue, green, red))
			for i in range(pad_bytes):
				bmpfile.write(pack('B', 0x00))
			


	def get_pixel_array_size(self, width, height):
		row_size = int((width * 24 + 31) / 32) * 4
		log.debug('row size: %d'%row_size)
		pa_size = row_size * height
		return pa_size, row_size

