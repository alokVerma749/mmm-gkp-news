import { Article } from "../timeline/page";
import getArticlesAction from "@/app/Actions/get-articles/getArticles";

const Alumni = async () => {
  const response: string = await getArticlesAction('alumni');
  const articles: Article[] = response ? JSON.parse(response as string) : []

  if (articles?.length === 0) {
    return (
      <p>Loading</p>
    )
  }

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
