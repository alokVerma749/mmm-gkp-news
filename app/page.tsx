import { Metadata } from "next";
import getArticlesAction from "./Actions/get-paginated-articles/getArticles";
import getTrendingArticlesAction from "./Actions/trending-articles/getTrendingArticles";
import { Article } from "./types/article";
import { Hero } from "@/app/components/hero";
import { Trending } from "@/app/components/trending";
import { CampusUpdatesInfiniteScroll } from "./components/campusUpdatesInfiniteScroll";
import { CampusUpdates } from "./components/campusUpdates";
import { Carousel } from "./components/carousel";

import { BreakingNews } from "./components/BreakingNews";
import { CategoryHighlights } from "./components/CategoryHighlights";
import { FeaturedStory } from "./components/FeaturedStory";

export const metadata: Metadata = {
  title: "MMMUT Chronicle - Campus News & Updates",
  description: "The official news source for Madan Mohan Malaviya University of Technology, Gorakhpur",
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

  const trendingResponse: string = await getTrendingArticlesAction({ limit: 10 });

  const initialArticles: Article[] = response1 ? JSON.parse(response1 as string) : [];
  const nextArticles: Article[] = response2 ? JSON.parse(response2 as string) : [];
  const trendingArticles: Article[] = trendingResponse ? JSON.parse(trendingResponse as string) : [];

  // Get featured article (first trending article)
  const featuredArticle = trendingArticles.length > 0 ? trendingArticles[0] : null;
  
  // Get remaining trending articles
  const remainingTrending = trendingArticles.slice(1);

  if (initialArticles.length === 0) {
    return (
      <div className="w-full text-center py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">No Articles Found</h2>
          <p className="text-gray-600">We are currently working on bringing you the latest campus news. Please check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Breaking News Ticker */}
      <BreakingNews articles={trendingArticles.slice(0, 5)} />

      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Hero - Desktop */}
            <div className="hidden lg:block lg:col-span-8">
              <Hero articles={trendingArticles} />
            </div>
            
            {/* Featured Story - Desktop */}
            <div className="hidden lg:block lg:col-span-4">
              {featuredArticle && <FeaturedStory article={featuredArticle} />}
            </div>
            
            {/* Mobile Carousel */}
            <div className="lg:hidden col-span-1">
              <Carousel articles={trendingArticles} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Category Highlights Section */}
            <CategoryHighlights />
            
            {/* Campus Updates Section */}
            <div className="mt-8 border-t-4 border-black">
              <h2 className="inline-block bg-black text-white px-4 py-2 text-xl font-bold font-serif uppercase tracking-wide mb-4">
                Campus Updates
              </h2>
              
              <div className="bg-white border border-gray-200 shadow-sm">
                <CampusUpdates articles={initialArticles} />
                <CampusUpdatesInfiniteScroll 
                  initialArticles={nextArticles} 
                  articleTag="timeline"
                />
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20">
              {/* Trending Section */}
              <div className="bg-white border border-gray-200 shadow-sm p-4">
                <h2 className="border-b-2 border-red-600 pb-2 text-xl font-bold font-serif mb-4">
                  Trending Headlines
                </h2>
                <Trending articles={remainingTrending} />
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-8 bg-gray-100 border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter for the latest campus news</p>
                <form className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              
              {/* Quick Links */}
              <div className="mt-8 bg-white border border-gray-200 shadow-sm p-4">
                <h3 className="border-b border-gray-200 pb-2 font-bold mb-2">Quick Links</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="text-blue-600 hover:underline">Academic Calendar</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Examination Schedule</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Faculty Directory</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Campus Map</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Student Portal</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
