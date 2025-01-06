import getComplaintsAction from "@/app/Actions/get-complaints/getComplaints";
import { IComplaint } from "@/app/models/complaint-schema";

const Articles = async () => {
  const response: string = await getComplaintsAction()
  const complaints: IComplaint[] = response ? JSON.parse(response as string) : [];
  return (
    <div className="flex flex-col lg:gap-0 bg-[#FDFDFD] lg:w-3/4 mx-auto shadow-md lg:py-0 overflow-hidden">
      <div className="flex items-center gap-4 py-4 pl-2 pr-0 lg:p-4 my-8">
        <h1 className="text-xl lg:text-4xl font-semibold capitalize">
          All Complaints ({complaints.length})
        </h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>
      {complaints.map((complaint: IComplaint, index: number) => (
        // <ArticleCard key={index} article={article} />
        <p key={index}>{complaint.complaint}</p> // need to add a component: SHUBHAM-TODO => create a Card component in components<admin
      ))}
      <p className="text-xs text-gray-500 my-3 text-center">Protected for Admins only.</p>
    </div>
  )
}

export default Articles
