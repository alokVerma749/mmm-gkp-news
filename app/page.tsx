import { Metadata } from "next";
import getArticlesAction from "./Actions/get-articles/getArticles";
import { Article } from "./types/article";
import { Hero } from "@/app/components/hero";
import { Trending } from "@/app/components/trending";
import { CampusUpdatesInfiniteScroll } from "./components/campusUpdatesInfiniteScroll";
import { CampusUpdates } from "./components/campusUpdates";

export const metadata: Metadata = {
  title: "Timeline-MMMUT GKP NEWS",
  description: "Get campus updates",
};

export default async function Home() {
  const response1: string = await getArticlesAction({
    primary_tag: "timeline",
    limit: 10,
    page: 1,
  });
  const response2: string = await getArticlesAction({
    primary_tag: "timeline",
    limit: 10,
    page: 2,
  });

  const initialArticles: Article[] = response1
    ? JSON.parse(response1 as string)
    : [];
  const nextArticles: Article[] = response2
    ? JSON.parse(response2 as string)
    : [];

  if (initialArticles.length === 0) {
    return <p>No articles found</p>;
  }

  return (
    <main className="w-full">
      <div className="w-full h-[50dvh] mx-auto mb-6 relative">
        <div className="w-full h-[60%] bg-[#020809] absolute top-0"></div>
        <Hero articles={initialArticles} />
      </div>
      
      <section className="lg:w-3/4 mx-auto flex flex-col lg:flex-row mt-4 gap-6 justify-between">
        <div>
          <CampusUpdates articles={initialArticles} />
          <CampusUpdatesInfiniteScroll
            initialArticles={nextArticles}
            articleTag="timeline"
          />
        </div>
        <Trending articles={initialArticles} />
      </section>
    </main>
  );
}
