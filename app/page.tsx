import { Metadata } from "next";
import getArticlesAction from "./Actions/get-articles/getArticles";
import { Article } from "./types/article";
import { CampusUpdates } from "@/app/components/campusUpdates";
import { Hero } from "@/app/components/hero";
import { Trending } from "@/app/components/trending";

export const metadata: Metadata = {
  title: "Timeline-MMMUT GKP NEWS",
  description: "Get campus updates",
};

export default async function Home() {
  const response: string = await getArticlesAction("timeline");
  const articles: Article[] = response ? JSON.parse(response as string) : [];

  if (articles.length === 0) {
    return <p>No articles found</p>;
  }
  return (
    <main className="w-3/4 mx-auto mt-[-16rem] bg-background">
      <Hero articles={articles} />
      <section className="flex flex-row mt-4 justify-between">
        <CampusUpdates articles={articles} />
        <Trending articles={articles} />
      </section>
    </main>
  );
}
