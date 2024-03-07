// 具体业务的api接口处理
import request from "@/api/axios";

// 登录举例
export const login = (data) => {
  return request.post({ url: "登录接口", data });
};
