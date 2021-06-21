"use strict";

import Vue from 'vue';
import axios from "axios";
import { getToken } from '@/util/common.js'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "",
  timeout: 5000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    config.headers['token'] = getToken()
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    console.log("response ->" + response)

		let res = response.data

		if (res.code === 200) {
			return response
		} else {
			Element.Message.error(!res.msg ? '系统异常' : res.msg)
			return Promise.reject(response.data.msg)
		}
  },
  function(error) {
    console.log(error)

		if (error.response.data) {
			error.massage = error.response.data.msg
		}

		if (error.response.status === 401) {
			this.$router.push("/login")
		}

		Element.Message.error(error.massage, {duration: 3000})
		return Promise.reject(error)
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
