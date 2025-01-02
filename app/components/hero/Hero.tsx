import { TopCard } from "../cards/topcard";
import { TrendingCard } from "../cards/trending";
import { Card4 } from "../cards/card4";
import { Card5 } from "../cards/card5";
import { Article } from "@/app/types/article";
import { BottomCard } from "../cards/bottomCard";

export const Hero = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="w-3/4 mx-auto h-[50dvh] flex flex-row bg-[#FDFDFD]">
      <div className="grid grid-rows-[75%_25%] w-1/2 p-6">
        <TopCard article={articles[6]} />

        <Card5 article={articles[1]} />
      </div>
      <div className="grid grid-rows-[60%_40%] w-1/2 pb-6">
        <Card4 article={articles[1]} />
        <BottomCard article={articles[1]} />
      </div>
    </div>
  );
};

export default Hero;
