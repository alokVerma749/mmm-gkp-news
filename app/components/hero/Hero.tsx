import { TopCard } from "../cards/topcard";
import { Card4 } from "../cards/card4";
import { Card5 } from "../cards/card5";
import { Article } from "@/app/types/article";
import { BottomCard } from "../cards/bottomCard";

export const Hero = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="w-3/4 mx-auto h-0 md:h-[50dvh] lg:flex flex-row bg-[#FDFDFD] relative z-10 overflow-hidden">
      <div className="grid grid-rows-[75%_25%] w-1/2 p-6">
        <TopCard article={articles[6]} />
        <Card5 article={articles[1]} />
      </div>
      <div className="grid grid-rows-[60%_40%] w-1/2">
        <Card4 article={articles[4]} />
        <BottomCard article={articles[9]} />
      </div>
    </div>
  );
};

export default Hero;
