import { useLocation } from "react-router-dom";

export function ArticlePage() {
  // 路由携带参数navigate("/home",{state:{id:123}})
  const articleId = useLocation().state;
  console.log(articleId);
  return (<>具体文章</>);
}
