import getArticlesAction from "@/app/Actions/get-articles/getArticles";

export interface Article {
  primary_tag: string;
  secondary_tags: string[];
  title: string;
  upvotes: number;
  downvotes: number;
  content: string;
}

const Placements = async () => {
  const response: string = await getArticlesAction('placements');
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

export default Placements
