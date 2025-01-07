import getSurveysAction from "@/app/Actions/get-surveys/getComplaints";
import { SurveyCard } from "@/app/components/admin/surveyCard/surveyCard";
import { ISuggestion } from "@/app/models/survey-schema";

const Articles = async () => {
  const response: string = await getSurveysAction()
  const complaints: ISuggestion[] = response ? JSON.parse(response as string) : [];
  return (
    <div className="flex flex-col lg:gap-0 bg-[#FDFDFD] lg:w-3/4 mx-auto shadow-md lg:py-0 overflow-hidden">
      <div className="flex items-center gap-4 py-4 pl-2 pr-0 lg:p-4 my-8">
        <h1 className="text-xl lg:text-4xl font-semibold capitalize">
          All Surveys ({complaints.length})
        </h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>
      {complaints.map((survey: ISuggestion, index: number) => (
        <SurveyCard key={index} suggestion={survey} />
      ))}
      <p className="text-xs text-gray-500 my-3 text-center">Protected for Admins only.</p>
    </div>
  )
}

export default Articles
