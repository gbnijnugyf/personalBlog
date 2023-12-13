import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  BASEURL,
  ClaOrFri,
  IAddClassify,
  IArticle,
  IArticleList,
  ILoginProps,
  ISearchProps,
  IAddClassifyData,
  IRootComment,
  IComment,
} from "./inter";

// 返回响应中data的类型
export interface IGlobalResponse<T> {
  data: T;
  msg: string;
  status: number;
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
  adminLogin(props: ILoginProps) {
    return GlobalAxios<string>("post", "/admin/login", props);
  },
  userSearch(props: string) {
    return GlobalAxios<ISearchProps[]>(
      "get",
      appendParams2Path("/func/search", { word: props })
    );
  },
  //获取所有文章列表（首页）
  getArticleList() {
    return GlobalAxios<IArticleList[]>(
      "get",
      appendParams2Path("/article/vlist", {})
    );
  },
  //根据分类获取文章列表
  getArticleListByClassify(props: string) {
    return GlobalAxios<IArticleList[]>(
      "get",
      appendParams2Path("/article/list", { classify: props })
    );
  },
  //props为文章id,获取文章详情
  getArticleDetail(props: string) {
    return GlobalAxios<IArticle>(
      "get",
      appendParams2Path("/article/page", { id: props })
    );
  },
  //获取分类
  getClassify() {
    return GlobalAxios<IAddClassifyData[]>(
      "get",
      appendParams2Path("/func/class", {})
    );
  },
  //添加分类
  addClassify(props: IAddClassify<ClaOrFri.classify>) {
    return GlobalAxios<undefined>("post", "/infoManager/add", props);
  },
  //文章编辑保存
  saveArticleEdit(props: IArticle) {
    return axios.put(BASEURL + "/article/edit", props);
  },
  //发布文章
  publishArticle(props: IArticle) {
    return GlobalAxios<undefined>("post", "/article/publish", props);
  },
  //发布评论
  publishComment(props: IComment) {
    return GlobalAxios<undefined>("post", "/comment/add", props);
  },
  //根据文章ID获取评论
  getComment(props: string) {
    return GlobalAxios<IRootComment[]>(
      "get",
      appendParams2Path("/comment/pagecom", { id: props })
    );
  },
};
