from os.path import join as joinpath, expanduser

from mutils.system import *


class Const():
	app_name 		= 'wallpaper_app'
	debug 			= False
	wallpaper_basename 	= 'wallp' + ('_debug' if debug else '')
	data_dir 		= expanduser('~/.wallp')
	cache_dir 		= expanduser(joinpath(data_dir, 'cache'))
	cache_enabled 		= True
	image_extensions 	= ['jpg', 'png', 'bmp', 'jpeg']
	script_name 		= 'wallp'
	scheduler_task_name 	= 'wallp_scheduled_task'
	scheduler_cmd 		= 'wallps' if is_windows() else script_name
	db_name 		= 'wallp.db'
	db_path 		= joinpath(data_dir, db_name)
	page_timeout		= 10
	default_server_port	= 40002
	http_chunksize		= 50 * 1024

