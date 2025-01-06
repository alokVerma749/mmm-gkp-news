import mongoose, { Schema, Document } from 'mongoose';

interface ContactForm extends Document {
  name: string;
  email: string;
  message: string;
  subject: string;
}

const ContactFormSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model<ContactForm>('Contact', ContactFormSchema);

export default Contact;
