import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

import { ElMessage, ElNotification } from "element-plus";
import qs from "qs";
import { getToken } from "@/utils/auth";
import errorCode from "./errorCode";

const baseUrl = import.meta.env.VITE_BASE_URL;

const timeout = 30000; // 超时时间

// 请求白名单，无须token的接口数组
const whiteList = ["/login"];

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: timeout, // 请求超时时间
  withCredentials: false // 禁用 Cookie 等信息
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    let isToken = (config!.headers || {}).isToken === false;

    whiteList.some((v) => {
      if (config.url) {
        if (config.url.indexOf(v) > -1) {
          isToken = false;
        }
      }
    });
    if (getToken() && !isToken) {
      config.headers.Authorization = "Bearer " + getToken(); // 此处是示例，根据项目来定Authorization
    }
    const params = config.params || {};
    const data = config.data || false;

    if (
      config.method?.toUpperCase() === "POST" &&
      config.headers["Content-Type"] ===
        "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(data);
    }
    // get参数转换
    if (config.method?.toUpperCase() === "GET" && params) {
      config.params = {};
      const paramsStr = qs.stringify(params, { allowDots: true });

      if (paramsStr) {
        config.url = config.url + "?" + paramsStr;
      }
    }
    return config;
  },
  (error) => {
    // console.log(error)
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  async response => {
    let { data } = response;

    if (!data) {
      // 没有返回值，报错
      throw new Error();
    }
    // 文件
    if (
      response.request.responseType === "blob" ||
      response.request.responseType === "arraybuffer"
    ) {
      if (response.data.type !== "application/json") {
        return response.data;
      }
      data = await new Response(response.data).json();
    }
    const code = data.code || 200;
    // 获取错误信息
    const msg = data.msg || errorCode[code] || errorCode["default"];

    if (code !== 200) {
      ElNotification.error({ title: msg });
      return Promise.reject("error");
    }
    return data;
  },
  (error) => {
    // console.log("err" + error)
    let { message } = error;

    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export { service };
