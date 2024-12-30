import getArticles from "@/app/Actions/get-articles/getArticles";

export interface Article {
  primary_tag: string;
  secondary_tags: string[];
  title: string;
  upvotes: number;
  downvotes: number;
  content: string;
}

const CollegeLife = async () => {
  const articles: Article[] = await getArticles('college_life');

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

export default CollegeLife
