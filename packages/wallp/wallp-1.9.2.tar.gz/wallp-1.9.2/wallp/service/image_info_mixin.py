
from .image_context import ImageContext
from ..db import ImageTrace


class ImageInfoMixin(object):
	def __init__(self):
		super(ImageInfoMixin, self).__init__()
		self._image_context = ImageContext()
		self._image_trace = []
		self._step = 1


	def add_trace_step(self, name, data):
		self._image_trace.append(ImageTrace(step=self._step, name=name, data=data))
		self._step += 1


	def add_trace_from(self, service):
		self._image_trace += service.image_trace


	def get_image_context(self):
		return self._image_context


	def get_image_trace(self):
		return self._image_trace


	image_context = property(get_image_context)
	image_trace = property(get_image_trace)

