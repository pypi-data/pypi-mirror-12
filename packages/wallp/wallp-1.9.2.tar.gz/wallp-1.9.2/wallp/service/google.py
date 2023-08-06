from mutils.system import *
if is_py3():
	from urllib.parse import urlencode, urlparse, parse_qs
	from urllib.error import HTTPError
else:
	from urllib import urlencode
	from urllib2 import HTTPError
	from urlparse import urlparse, parse_qs

import json
from random import choice
from os.path import join as joinpath
from zope.interface import implementer

from mutils.html.parser import HtmlParser

from ..web import func as webfunc
from ..util import log
from .service import IHttpService, ServiceError
from .image_info_mixin import ImageInfoMixin
from .image_urls_mixin import ImageUrlsMixin
from .image_context import ImageContext
from ..db import SearchTermList


@implementer(IHttpService)
class Google(ImageInfoMixin, ImageUrlsMixin):
	name = 'google'

	search_base_url = "https://www.google.com/search?tbm=isch&"
	colors 		= ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink', 'white', 'gray', 'black', 'brown']
	user_agent 	= 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:41.0) Gecko/20100101 Firefox/41.0'

	def __init__(self):
		super(Google, self).__init__()


	def get_image_url(self, query=None, color=None):
		if self.image_urls_available():
			image_url = self.select_url()
			return image_url

		self.search(query, color)
		image_url = self.select_url()

		return image_url


	def search(self, query, color):
		if query is None:
			query = SearchTermList().get_random()
			self.add_trace_step('random search term', query)

		if color is not None and not color in self.colors:
			log.error('%s is not a supported color for google image search. please choose from: %s'%(color, ', '.join(self.colors)))
			raise ServiceError()
		else:
			self.add_trace_step('color', color)

		params = {
			'as_q'		: query,
			'as_st'		: 'y',
			'as_epq'	: '',
			'as_oq'		: '',
			'as_eq'		: '',
			'cr'		: '',
			'as_sitesearch' : '',
			'safe'		: 'active',
			'tbs'		: 'isz:lt,islt:xga' + ',ic:specific,isc:%s'%color if color is not None else ''
		}

		search_url = self.search_base_url + urlencode(params)
		response = webfunc.get_page(search_url, headers = {'User-Agent': self.user_agent})
		self.add_trace_step('searched google', query)

		self.extract_results(response)
		
		
	def extract_results(self, response):
		etree = self.get_etree(response)
		result_div_path = './/div[@class=\'rg_di rg_el ivg-i\']'

		for div in etree.findall(result_div_path):
			a = div.find('.//a')
			if a is None:
				continue

			href = a.attrib.get('href', None)
			query = urlparse(href).query
			params = parse_qs(query)
			imgurl = params.get('imgurl', None)

			if imgurl is None:
				continue

			meta_div = div.find(".//div[@class='rg_meta']")
			image_context = None
			if meta_div is not None:
				meta = json.loads(meta_div.text)

				url 		= meta.get('isu', None)
				title		= meta.get('pt', None)
				description	= meta.get('s', None)

				if any([i != None for i in [url, title, description]]):
					image_context = ImageContext(url=url, title=title, description=description)

			self.add_url(imgurl[0], image_context)


	def get_etree(self, html):
		parser = HtmlParser()
		parser.feed(html)
		etree = parser.etree

		return etree

