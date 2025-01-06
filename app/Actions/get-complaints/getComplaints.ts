'use server';

import { getComplaints } from "@/app/services/get-complaints";
import { toast } from "@/hooks/use-toast";

const getComplaintsAction = async (): Promise<string> => {
  try {
    const complaints = await getComplaints();
    return JSON.stringify(complaints);
  } catch (error) {
    console.error("Error in fetching complaints", error);
    toast({
      title: "Error in fetching complaints"
    })
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getComplaintsAction;
