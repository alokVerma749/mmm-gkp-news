import connect_db from '../config/db';
import Suggestion, { ISuggestion } from '../models/survey-schema';

export const getSurveys = async (): Promise<ISuggestion[]> => {
  await connect_db();

  try {
    const surveys = await Suggestion.find({}).exec();
    return surveys as ISuggestion[];
  } catch (error) {
    console.error("Error fetching all surveys:", error instanceof Error ? error.message : error);
    return [];
  }
};
