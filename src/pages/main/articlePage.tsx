import { useLocation } from "react-router-dom";
import { Service } from "../../globe/service";
import { useEffect, useState } from "react";

export function ArticlePage() {
  const [articleUrl, setArticleUrl] = useState<string>();
  // 路由携带参数navigate("/home",{state:{id:123}})
  const articleId = useLocation().state.id;
  console.log(articleId);

  useEffect(() => {
    Service.getArticleDetail(articleId).then((res) => {
      const articleBody = res.data.data;
      // setArticleUrl(url);
      console.log(articleBody)
    });
  }, [articleId]);
  
  return (
    <>
      <div>具体文章{articleId}</div>
    </>
  );
}
