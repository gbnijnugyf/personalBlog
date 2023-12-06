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
export type ISearchProps = {
  title: string;
  ID: string;
}[];

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
interface IAddClassifyData {
  name: string;
  description: string;
  url: string;
  cover: string;
}