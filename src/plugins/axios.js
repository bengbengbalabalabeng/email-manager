"use strict";

import Vue from 'vue';
import axios from "axios";
import router from "../router";
import { Message } from "element-ui";
import {getToken, containsStr} from '../util/common.js'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

let config = {
    baseURL: 'http://localhost:8090',
    timeout: 5000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        if (getToken()) {
            config.headers['authorization'] = getToken()
        }
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        let result = response.data
        if (result) {
            if (result.statusCode === 200) {
                return response
            } else {
                Message.error(!result.message ? '系统异常' : result.message)
                return Promise.reject(result.message)
            }
        } else {
            if (containsStr(response.config.url, 'login')) {
                return response
            } else {
                Message.error('系统异常')
                return Promise.reject('系统异常')
            }
        }
    },
    function (error) {
        let errorInfo = error.response.data
        if (errorInfo) {
            error.message = errorInfo.message
        }

        if (errorInfo.statusCode === 401) {
            router.push("/login")
        }

        Message.error(error.message, {duration: 3000})
        return Promise.reject(error)
    }
);

Plugin.install = function (Vue) {
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
