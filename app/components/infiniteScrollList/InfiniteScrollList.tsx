'use client';

import { useState, useEffect, useCallback } from "react";
import { Article } from "@/app/types/article";
import { ArticleListCard } from "@/app/components/cards/articleListCard";
import getArticlesAction from "@/app/Actions/get-paginated-articles/getArticles";
import { Loader } from "../spinner";
import { toast } from "@/hooks/use-toast";

type InfiniteScrollListProps = {
  initialArticles: Article[];
  article_tag: string;
  initialPage: number;
};

export const InfiniteScrollList = ({ initialArticles, article_tag, initialPage }: InfiniteScrollListProps) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = JSON.parse(await getArticlesAction({
        primary_tag: article_tag,
        page: page,
      }));
      // Check if the response is valid JSON
      if (!response) {
        console.error("Invalid response");
        return;
      }

      let newArticles: Article[] = [];
      try {
        // Assuming the response is already JSON, if not, you can parse it here
        newArticles = response; // if response is already an array
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return; // Early return if JSON parsing fails
      }

      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching more articles:", error);
      toast({
        title: 'Error fetching more articles'
      })
    } finally {
      setLoading(false);
    }
  }, [article_tag, page, loading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        fetchMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreArticles]);

  return (
    <div className="flex flex-col gap-2 bg-background w-3/4 mx-auto shadow-md py-4">
      {articles.map((article, index) => (
        <ArticleListCard key={index} article={article} />
      ))}
      {loading && <div className="text-center text-lg my-4"><Loader variant="small" /></div>}
      {!hasMore && <p className="text-center text-lg my-4">No more articles available.</p>}
    </div>
  );
};
