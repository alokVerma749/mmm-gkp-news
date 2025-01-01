import Image from "next/image";
import { Metadata } from "next";
import getArticleAction from "@/app/Actions/get-article/getArticle";
import { Article as ArticleType } from "@/app/types/article";

type ArticleProps = {
  params: Promise<{ article_id: string }>; // Note: Keeping this async if required
};

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { article_id } = await params;

  const response: string = await getArticleAction(article_id);
  const article: ArticleType | null = response ? JSON.parse(response) : null;

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article was not found.",
    };
  }

  return {
    title: article.title,
    description: article.content.slice(0, 150),
  };
}

export default async function Article({ params }: ArticleProps) {
  const { article_id } = await params;

  const response: string = await getArticleAction(article_id);
  const article: ArticleType | null = response ? JSON.parse(response) : null;

  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article?.image || defaultImage;


  if (!article) {
    return <p>No articles found</p>;
  }

  return (
    <div>
      <div className="w-3/4 mx-auto border border-gray-800 rounded-xl mt-[-12.5rem] shadow-lg shadow-slate-700">
        <Image
          alt={`${article.title} thumbnail`}
          className="flex-shrink-0 rounded-xl w-full h-96 object-cover object-center"
          src={imageSrc}
          width={200}
          height={200}
        />
      </div>
      <div className="w-3/4 mx-auto mt-16">
        <h1 className="text-xl font-semibold my-2">{article.title}</h1>
        <p className="break-all text-preety">{article.content}</p>

        <div className="mt-16">
          <p>Upvotes: {article.upvotes}</p>
          <p>Downvotes: {article.downvotes}</p>
        </div>
      </div>
    </div>
  );
}
