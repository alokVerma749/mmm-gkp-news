import { IComplaint } from "@/app/models/complaint-schema";

interface ComplaintCardProps {
  complaint: IComplaint;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  return (
    <div className="flex items-center justify-start p-4 mx-2 lg:mx-4 h-auto">
      <p className="text-lg font-normal">{complaint.complaint}</p>
    </div>
  );
};
