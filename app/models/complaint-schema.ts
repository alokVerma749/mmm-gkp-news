import mongoose, { Document, Schema } from 'mongoose';

interface IComplaint extends Document {
  complaint: string;
  articleLinks: string[];
  proof?: string;
  name?: string;
  email?: string;
}

const complaintSchema: Schema<IComplaint> = new Schema(
  {
    complaint: {
      type: String,
      required: true,
    },
    articleLinks: {
      type: [String],
      default: [],
    },
    proof: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model<IComplaint>('Complaint', complaintSchema);

export default Complaint;
