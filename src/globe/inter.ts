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
