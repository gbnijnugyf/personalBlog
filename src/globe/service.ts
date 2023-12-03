import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { parse } from "url";
import { ILoginProps } from "./inter";
const BASEURL = "localhost:3000";

interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
}
async function GlobalAxios<T = any, D = any>(
  method: "post",
  url: string,
  data: D
): Promise<AxiosResponse<IGlobalResponse<T>, any>>;
async function GlobalAxios<T = any>(
  method: "get" | "delete",
  url: string
): Promise<AxiosResponse<IGlobalResponse<T>, any>>;
async function GlobalAxios<T = any, D = any>(
  method: "get" | "post" | "delete",
  url: string,
  data?: D
): Promise<AxiosResponse<IGlobalResponse<T>, any>> {
  let config: AxiosRequestConfig<D> = {};
  config.baseURL = BASEURL;
  config.headers = { token: localStorage.getItem("token") || "" };

  const parsedURL = parse(url);
  const params = new URLSearchParams(parsedURL.query || "");
  url = parsedURL.pathname || "";
  config.params = params;

  let response;
  if (method === "post") {
    response = await axios[method]<IGlobalResponse<T>>(url, data, config);
  } else {
    params.set("time", new Date().getTime().toString());
    response = await axios[method]<IGlobalResponse<T>>(url, config);
  }

  // TODO: have bug, check later
  if (response.statusText === "OK") {
    return response;
  } else if (response.status === -2) {
    alert(response.data.msg);
    localStorage.removeItem("token");

    // 重定向到根目录，重新登录
    let redirectpos = window.location.href;
    redirectpos = redirectpos.slice(0, redirectpos.indexOf("/", 10) + 1);
    // window.location.href(redirectpos)
    window.location.href = redirectpos;
  } else if (response.data.status !== 0) {
    alert(response.data.msg);
    return response;
  }

  return response;
}
export const Service = {
  //whut邮箱验证
  whutCheckEmail(email: string) {
    return GlobalAxios<{ emailVV: string }>(
      "post",
      "/whutregister/checkemail",
      {
        data: {
          email: email,
        },
      }
    );
  },
  adminLogin(props: ILoginProps) {
    return GlobalAxios<string>("post", "/admin/login", props);
  },
};
