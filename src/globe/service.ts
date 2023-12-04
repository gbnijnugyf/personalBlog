import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASEURL, ILoginProps, ISearchProps } from "./inter";

// 返回响应中data的类型
export interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
}
interface IPostSpeechText {
  text: string
}
function appendParams2Path(
  path: string,
  paramsRaw: string | URLSearchParams | string[][] | Record<string, string>
) {
  const params = new URLSearchParams(paramsRaw);
  return `${path}?${params.toString()}`;
}

async function GlobalAxios<T = any, D = any>(
  method: "post" | "get" | "delete",
  url: string,
  data?: D
): Promise<AxiosResponse<IGlobalResponse<T>, any>> {


  let config: AxiosRequestConfig<D> = {};
  config.baseURL = BASEURL;

  const parsedURL = new URL(BASEURL + url);
  //   const parsedURL = parse(url);

  const params = new URLSearchParams(parsedURL.searchParams || "");
  //   url = parsedURL.pathname || "";
  config.params = params;

  let response;
  if (method === "post") {
    //axios将data自动序列化为json格式
    response = await axios[method]<IGlobalResponse<T>>(url, data, config);
  } else {
    params.set("time", new Date().getTime().toString());
    response = await axios[method]<IGlobalResponse<T>>(url, config);
  }


  if (response.statusText === "OK") {
    return response;
  } else {
    alert(response.data.msg);
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
  userSearch(props: string) {
    return GlobalAxios<ISearchProps>(
      "get",
      appendParams2Path("/main/search", { word: props })
    );
  },
};
