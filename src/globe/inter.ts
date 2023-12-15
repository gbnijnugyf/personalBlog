export const BASEURL = "http://127.0.0.1:4523/m1/3692872-0-default";
export interface ILoginProps {
  userName: string;
  passWord: string;
}
// export interface ISearchProps {
//   result: {
//     title: string;
//     ID: string;
//   }[];
// }
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
export interface IAddClassify<T extends ClaOrFri> {
  type: T;
  data: T extends 1
    ? Omit<IAddClassifyData, "url" | "cover">
    : IAddClassifyData;
}
export interface IAddClassifyData {
  name: string;
  description: string;
  url: string;
  cover: string;
}

export interface IArticle {
  body: string;
  classification: string;
  cover: null | string;
  ID: null | string;
  releaseTime: null | string;
  title: string;
  visible: number;
}
export const articleInit: IArticle = {
  body: "",
  classification: "",
  cover: null,
  ID: null,
  releaseTime: null,
  title: "",
  visible: 0,
};
export interface IMenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
// export interface IComment {
//   commentID: string;
//   email: string;
//   isBlogger: string;
//   nickname: string;
//   preID: null | string;
//   primary: string;
// }

export interface IRootComment {
  rootComment: IComment;
  reply: IComment[];
}

export interface IComment {
  avator_url: null | string;
  passageID: string;
  commentID: string|null;
  email: string;
  isBlogger: null | string;
  nickname: string;
  preID: null | string;
  primary: number;//为0时，属于留言；为1时，属于文章
  time: string;
  body: string;
}

export interface IFriendLink {
    cover: string;
    description: string;
    name: string;
    url: string;
}