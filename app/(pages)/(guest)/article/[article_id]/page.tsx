'use server'

import Image from "next/image";
import { Metadata } from "next";
import { ArrowBigUp } from "lucide-react";
import Markdown from "react-markdown";
import getArticleAction from "@/app/Actions/get-article/getArticle";
import { Article as ArticleType } from "@/app/types/article";
import Voting from "@/app/components/voting/Voting";

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
      <div className="w-full mx-auto relative">
        <div className="w-full h-[60%] bg-[#1A1A1A] lg:bg-foreground absolute top-0 z-0"></div>
        {/* Render static initial articles */}
        <div className="relative z-10 px-2 lg:px-0">
          <div className="lg:w-3/4 lg:mx-auto border rounded-lg overflow-hidden border-gray-800 lg:rounded-none lg:rounded-b-xl shadow-lg shadow-slate-700 custom-height-1 custom-height-2 custom-height-3">
            <Image
              alt={`${article.title} thumbnail`}
              className="flex-shrink-0 w-full h-96 object-cover object-center"
              src={imageSrc}
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
      <div className="w-[80%] lg:w-3/4 mx-auto">
        <div className="flex gap-4 mt-12 lg:mt-16">
          <Voting article_id={article_id} />
        </div>

        <div className=" mt-4">
          <h1 className="text-3xl font-semibold my-2 mb-4">{article.title}</h1>
          <div className="h-[1.8] w-[80%] bg-[#c7c7c7] my-2 lg:my-4"></div>
          <div className="markdown-content prose prose-lg prose-slate max-w-full">
            <Markdown>{article.content}</Markdown>
          </div>

          <div className="mt-16">
            <div className="flex justify-center items-center">
              <p className="text-sm">Total</p>
              <ArrowBigUp strokeWidth={1} />
              <p className="text-sm">{article.upvotes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
