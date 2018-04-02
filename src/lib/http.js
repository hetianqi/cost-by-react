/**
 * http请求服务，包装axios
 */

import axios from 'axios';
import config from './config';

const http = axios.create({
	baseURL: config.rootUrl,
	withCredentials: true
});

// http通用设置
http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
http.defaults.headers.get['Cache-Control'] = 'no-cache';
http.defaults.headers.get['If-Modified-Since'] = 0;

export default http;