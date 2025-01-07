import Link from "next/link";
import { IComplaint } from "@/app/models/complaint-schema";

export const ComplaintCard = ({ complaint }: { complaint: IComplaint }) => {
  return (
    <div className="h-full w-full flex sm:text-left md:p-4 m-2 relative min-h-28 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out hover:bg-gray-50">
      <div className="flex-1 w-full lg:pl-6 pr-3 lg:pr-0 flex flex-col justify-center overflow-hidden items-start py-3 lg:py-4">
        <h3 className="text-gray-700 text-xs lg:text-base mb-1">Name: {complaint.name}</h3>
        <h3 className="text-gray-700 text-xs lg:text-base mb-1">Email: {complaint.email}</h3>
        <h3 className="text-gray-700 text-xs lg:text-base mb-1">Proof: {complaint.proof}</h3>
        <p className="lg:mb-4 text-[#04594D] text-xs lg:text-lg leading-relaxed truncate">{complaint.complaint}</p>

        {/* Display articleLinks if they exist */}
        {complaint.articleLinks && complaint.articleLinks.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold text-sm lg:text-base text-gray-800 mb-2">Related Articles:</h4>
            <ul className="list-disc pl-5 text-xs lg:text-sm text-blue-600">
              {complaint.articleLinks.map((link, index) => (
                <li key={index} className="mb-1">
                  <Link href={link}>{link}</Link>
                </li>
              ))}
            </ul>
            <button className="bg-green-500 hover:bg-green-400 h-fit text-sm text-gray-100 p-1 rounded-sm mt-2">Mark Resolved</button>
          </div>
        )}
      </div>
    </div>
  );
};
