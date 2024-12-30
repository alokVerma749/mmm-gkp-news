import getArticles from "@/app/Actions/get-articles/getArticles";
import { Article } from "../timeline/page";

const Alumni = async () => {
  const articles: Article[] = await getArticles("alumni");

  return (
    <div>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>{article.title}</li>
          ))}
        </ul>
      ) : (
        <p>No articles found</p>
      )}
    </div>
  )
}

export default Alumni
