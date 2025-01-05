"use client";

import React, { FormEvent, useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import upvoteArticleAction from "@/app/Actions/upvote-article/upvoteArticle";
import downvoteArticleAction from "@/app/Actions/downvote-article/downvoteArticle";
import { toast } from "@/hooks/use-toast";

interface VotingProps {
  article_id: string;
}

const Voting: React.FC<VotingProps> = ({ article_id }) => {
  const [disableButtons, setDisableButtons] = useState(false);
  const [voted, setVoted] = useState<"upvoted" | "downvoted" | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, action: (formData: FormData) => Promise<void>, voteType: "upvote" | "downvote") => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await action(formData);
    setDisableButtons(true);
    setVoted(voteType === "upvote" ? "upvoted" : "downvoted");
  };

  async function onUpvote(data: FormData) {
    const res = await upvoteArticleAction(data);
    if (res.success) {
      toast({
        title: "Article Upvoted Successfully",
        description: "Thank you for your support! Your vote has been counted, and the article's score will be updated shortly.",
      });
    }
  }

  async function onDownvote(data: FormData) {
    const res = await downvoteArticleAction(data);
    if (res.success) {
      toast({
        title: "Article Downvoted",
        description: "We regret that you didn't like this article. Your feedback matters! If you would like to share why, please [click here](#) to provide feedback (Article ID: {article_id}).",
      });
    }
  }

  return (
    <div className="flex space-x-4">
      {/* Upvote Button */}
      <form onSubmit={(e) => handleSubmit(e, onUpvote, "upvote")} className="flex justify-center items-center">
        <input type="hidden" name="article_id" value={article_id} />
        <button
          type="submit"
          disabled={disableButtons}
          className={`flex justify-center items-center ${voted === "upvoted" ? "bg-green-500" : disableButtons ? "bg-gray-200" : "bg-[#04594D] animate-bounce"} text-white px-4 py-1 rounded-md`}
        >
          <ArrowBigUp color={voted === "upvoted" ? "green" : undefined} strokeWidth={1.75} />
          <p className={`text-xs ${voted === "upvoted" ? 'font-semibold' : ''}`}>
            {voted === "upvoted" ? "Upvoted" : "Upvote"}
          </p>
        </button>
      </form>

      {/* Downvote Button */}
      <form onSubmit={(e) => handleSubmit(e, onDownvote, "downvote")} className="flex justify-center items-center">
        <input type="hidden" name="article_id" value={article_id} />
        <button
          type="submit"
          disabled={disableButtons}
          className={`flex justify-center items-center ${voted === "downvoted" ? "bg-red-500" : disableButtons ? "bg-gray-500" : "bg-gray-700"} text-white px-4 py-1 rounded-md`}
        >
          <ArrowBigDown strokeWidth={1.75} />
          <p className={`text-xs ${voted === "downvoted" ? 'font-semibold' : ''}`}>
            {voted === "downvoted" ? "Downvoted" : "Downvote"}
          </p>
        </button>
      </form>
    </div>
  );
};

export default Voting;
