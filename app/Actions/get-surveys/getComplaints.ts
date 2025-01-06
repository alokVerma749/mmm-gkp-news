'use server';

import { getSurveys } from "@/app/services/get-surveys";
import { toast } from "@/hooks/use-toast";

const getSurveysAction = async (): Promise<string> => {
  try {
    const surveys = await getSurveys();
    return JSON.stringify(surveys);
  } catch (error) {
    console.error("Error in fetching surveys", error);
    toast({
      title: "Error in fetching surveys"
    })
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getSurveysAction;
