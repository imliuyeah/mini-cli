import { service } from "./service";

const defaultHeaders = "application/json";

const request = (option) => {
  const { url, method, params, data, headersType, responseType, ...config } =
    option;

  return service({
    url: url,
    method,
    params,
    data,
    ...config,
    responseType: responseType,
    headers: {
      "Content-Type": headersType || defaultHeaders
    }
  });
};

export default {
  get: async (option) => {
    const res = await request({ method: "GET", ...option });

    return res.data;
  },
  post: async (option) => {
    const res = await request({ method: "POST", ...option });

    return res.data;
  },
  postOriginal: async (option) => {
    const res = await request({ method: "POST", ...option });

    return res;
  },
  delete: async (option) => {
    const res = await request({ method: "DELETE", ...option });

    return res.data;
  },
  put: async (option) => {
    const res = await request({ method: "PUT", ...option });

    return res.data;
  },
  download: async (option) => {
    const res = await request({
      method: "GET",
      responseType: "blob",
      ...option
    });

    return res;
  },
  upload: async (option) => {
    option.headersType = "multipart/form-data";
    const res = await request({ method: "POST", ...option });

    return res;
  }
};
