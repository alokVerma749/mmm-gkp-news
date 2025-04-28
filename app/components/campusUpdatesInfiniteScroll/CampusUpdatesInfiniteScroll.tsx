'use client'

import { useState, useEffect, useCallback } from "react";
import { Article } from "@/app/types/article";
import { Card2 } from "../cards/card2";
import getArticlesAction from "@/app/Actions/get-paginated-articles/getArticles";
import { Loader } from "../spinner";
import { toast } from "@/hooks/use-toast";

type CampusUpdatesInfiniteScrollProps = {
  initialArticles: Article[];
  articleTag: string;
};

export const CampusUpdatesInfiniteScroll = ({ initialArticles, articleTag }: CampusUpdatesInfiniteScrollProps) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [page, setPage] = useState(3); // Start from page 3 since page 1 is already fetched
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = JSON.parse(await getArticlesAction({
        primary_tag: articleTag,
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
        toast({
          title: 'Something went wrong'
        })
        return; // Early return if JSON parsing fails
      }

      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching more articles:', error);
      toast({
        title: 'Error fetching more articles'
      })
    } finally {
      setLoading(false);
    }
  }, [articleTag, page, loading, hasMore]);

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

  // Split articles into two parts
  const firstHalf = articles.slice(0, Math.ceil(articles.length / 2));
  const secondHalf = articles.slice(Math.ceil(articles.length / 2));

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
        {/* Left section with first half of articles */}
        <div className="flex flex-col lg:gap-4 lg:w-1/2">
          {firstHalf.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>

        {/* Right section with second half of articles */}
        <div className="flex flex-col lg:gap-4 lg:w-1/2">
          {secondHalf.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>
      </div>
      {loading && <div className="text-center mt-6"><Loader variant="small" /></div>}
      {!hasMore && <p className="text-center mt-4">No more articles available.</p>}
    </div>
  );
};
