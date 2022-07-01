import axios from "axios";
import { Message } from "element-ui";
import cookies from "libs/util.cookies";
import router from "@/router";

const goLogin = () => router.replace({ name: "login" });

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "/api" : process.env.VUE_APP_API,
  timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data: dataAxios } = response;
    const { code, data } = dataAxios;
    switch (code) {
      case 1:
        return data;
      case 401:
        // 返回登录页
        goLogin();
        break;
      default:
        Message({
          message: dataAxios.msg,
          type: "error",
          duration: 3000,
          showClose: true,
        });
        break;
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          goLogin();
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求地址出错";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default service;
