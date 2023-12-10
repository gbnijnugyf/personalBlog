export const BASEURL = "http://127.0.0.1:4523/m1/3692872-0-default";
export interface ILoginProps {
  username: string;
  password: string;
}
// export interface ISearchProps {
//   result: {
//     title: string;
//     ID: string;
//   }[];
// }
export interface ISearchProps  {
  title: string;
  ID: string;
};

export interface IArticleList {
  title: string;
  ID: string;
  cover: string;
}
export enum ClaOrFri{
  classify = 1,
  friendLink
}
export interface IAddClassify<T extends ClaOrFri> {
  type: T;
  data: T extends 1 ? Omit<IAddClassifyData, "url" | "cover"> : IAddClassifyData;
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