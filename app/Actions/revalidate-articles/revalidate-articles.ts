'use server';

import { revalidatePath } from "next/cache";

export const revalidateArticles = async () => {
  try {
    // Trigger revalidation for the articles page
    const tags: string[] = [
      "department",
      "hostel",
      "library",
      "events",
      "placements",
      "college_life",
      "alumni",
      "admissions",
      "scholarships",
    ];
    revalidatePath('/admin/articles');
    for (const tag of tags) {
      revalidatePath(`/articles/${tag}`);
    }
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error revalidating articles path:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error occurred:", error);
      return { success: false, error: "An unknown error occurred." };
    }
  }
};
