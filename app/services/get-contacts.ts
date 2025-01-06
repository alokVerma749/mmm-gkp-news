import connect_db from '../config/db';
import Contact, { ContactForm } from '../models/contact-model';

export const getContacts = async (): Promise<ContactForm[]> => {
  await connect_db();

  try {
    const contacts = await Contact.find({}).exec();
    return contacts as ContactForm[];
  } catch (error) {
    console.error("Error fetching all contacts:", error instanceof Error ? error.message : error);
    return [];
  }
};
