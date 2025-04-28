import { Metadata } from "next";
import getArticlesAction from "./Actions/get-paginated-articles/getArticles";
import { Article } from "./types/article";
import { Hero } from "@/app/components/hero";
import { Trending } from "@/app/components/trending";
import { CampusUpdatesInfiniteScroll } from "./components/campusUpdatesInfiniteScroll";
import { CampusUpdates } from "./components/campusUpdates";
import { Carousel } from "./components/carousel";
import getTrendingArticlesAction from "./Actions/trending-articles/getTrendingArticles";
import Header from "./components/header/Header";

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

  const trendingResponse: string = await getTrendingArticlesAction({ limit: 10, });

  const initialArticles: Article[] = response1 ? JSON.parse(response1 as string) : [];
  const nextArticles: Article[] = response2 ? JSON.parse(response2 as string) : [];
  const trendingArticles: Article[] = trendingResponse ? JSON.parse(trendingResponse as string) : [];

  if (initialArticles.length === 0) {
    return (
      <div className="w-full text-center">
        <p className="text-xl p-2">No articles found</p>
      </div>
    )
  }

  return (
    <main className="w-full">
      <div className="lg:hidden w-full h-[30dvh] overflow-hidden">
        <Carousel articles={trendingArticles} />
      </div>
      <div className="bg-[#1A1A1A] lg:bg-foreground">
        <Header />
      </div>
      <div className="hidden lg:block h-0 w-full md:h-[50dvh] mx-auto mb-6 relative">
        <div className="w-full h-[60%] bg-[#020809] absolute top-0"></div>
        <Hero articles={trendingArticles} />
      </div>

      <section className="lg:w-3/4 mx-auto flex flex-col-reverse lg:flex-row lg:mt-4 gap-6 justify-between bg-[#FDFDFD] lg:bg-transparent">
        <div>
          <CampusUpdates articles={initialArticles} />
          <CampusUpdatesInfiniteScroll initialArticles={nextArticles} articleTag="timeline"
          />
        </div>
        <Trending articles={trendingArticles} />
      </section>
    </main>
  );
}
