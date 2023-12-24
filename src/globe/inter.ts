// export const BASEURL = "http://127.0.0.1:4523/m1/3692872-0-default";
export const BASEURL = "http://10.79.140.249:5000";
export const COOKIETOKEN = "bloggerLoginCheck"
export function appendParams2Path(
  path: string,
  paramsRaw: string | URLSearchParams | string[][] | Record<string, string>
) {
  const params = new URLSearchParams(paramsRaw);
  return `${path}?${params.toString()}`;
}
export interface ILoginProps {
  userName: string;
  passWord: string;
}
export interface ISearchProps {
  title: string;
  ID: string;
}

export interface IArticleList {
  title: string;
  ID: string;
  cover: string;
}
export enum ClaOrFri {
  classify = 1,
  friendLink,
}
export interface IAddClassify {
  name: string;
  description: string;
}
export interface IAddClassifyData {
  name: string;
  description: string;
  url: string;
  cover: string;
}
export interface ISaveArticle {
  id: string;
  releaseTime: string;
}

export interface IArticle {
  visibility: number; //0不可见 1可见
  body: string;
  classification: string;
  cover: null | string;
  ID: string;
  releaseTime: null | string;
  title: string;
}
export const articleInit: IArticle = {
  body: "",
  classification: "",
  cover: null,
  ID: "",
  releaseTime: null,
  title: "",
  visibility: 0,
};
export interface IMenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export interface IRootComment {
  rootComment: IComment;
  reply: IComment[];
}

export interface IComment {
  avator_url: null | string;
  passageID: string;
  commentID: string | null;
  email: string;
  isBlogger: number;//1为博主
  nickname: string;
  preID: null | string;
  primary: number; //为0时，属于留言；为1时，属于文章
  time: string;
  body: string;
}

export interface IFriendLink {
  cover: string;
  description: string;
  name: string;
  url: string;
}
export interface IClassEdit {
  oldname: string;
  name: string;
  description: string;
}
export interface IDeleteFriOrClas {
  name: string;
  type: string; //"1"表示分类、"2"表示友链
}
