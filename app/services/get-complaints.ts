import connect_db from '../config/db';
import Complaint, { IComplaint } from '../models/complaint-schema';

export const getComplaints = async (): Promise<IComplaint[]> => {
  await connect_db();

  try {
    const complaints = await Complaint.find({}).exec();
    return complaints as IComplaint[];
  } catch (error) {
    console.error("Error fetching all articles:", error instanceof Error ? error.message : error);
    return [];
  }
};
