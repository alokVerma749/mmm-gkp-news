'use server'

import Image from "next/image";
import { Metadata } from "next";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import Markdown from "react-markdown";
import getArticleAction from "@/app/Actions/get-article/getArticle";
import { Article as ArticleType } from "@/app/types/article";
import downvoteArticleAction from "@/app/Actions/downvote-article/downvoteArticle";
import upvoteArticleAction from "@/app/Actions/upvote-article/upvoteArticle";

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

  async function onUpvote(data: FormData) {
    'use server'

    await upvoteArticleAction(data)
  }

  async function onDownvote(data: FormData) {
    'use server'

    await downvoteArticleAction(data)
  }

  return (
    <div className="">
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
          {/* Upvote Form */}
          <form action={onUpvote} className="flex justify-center items-center">
            <input type="hidden" name="article_id" value={article_id} />
            <button
              type="submit"
              className="flex justify-center items-center bg-[#04594D] text-white px-4 py-1 rounded-md animate-bounce"
            >
              <ArrowBigUp strokeWidth={1.75} />
              <p className="text-xs">Upvote</p>
            </button>
          </form>
          {/* Downvote Form */}
          <form
            action={onDownvote}
            className="flex justify-center items-center"
          >
            <input type="hidden" name="article_id" value={article_id} />
            <button
              type="submit"
              className="flex justify-center items-center bg-gray-700 text-white px-4 py-1 rounded-md"
            >
              <ArrowBigDown strokeWidth={1.75} />
              <p className="text-xs">Downvote</p>
            </button>
          </form>

        </div>

        <div className=" mt-4">
          <h1 className="text-xl font-semibold my-2 mb-4">{article.title}</h1>
          <div className="h-[1.8] w-[80%] bg-[#c7c7c7] my-2 lg:my-4"></div>
          <div className="markdown-content">
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
