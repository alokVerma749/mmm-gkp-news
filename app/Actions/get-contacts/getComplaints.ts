'use server';

import { getContacts } from "@/app/services/get-contacts";
import { toast } from "@/hooks/use-toast";

const getContactsAction = async (): Promise<string> => {
  try {
    const contacts = await getContacts();
    return JSON.stringify(contacts);
  } catch (error) {
    console.error("Error in fetching contacts", error);
    toast({
      title: "Error in fetching contacts"
    })
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getContactsAction;
