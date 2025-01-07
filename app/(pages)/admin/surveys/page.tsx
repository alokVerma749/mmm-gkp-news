import getSurveysAction from "@/app/Actions/get-surveys/getComplaints";
import { ISuggestion } from "@/app/models/survey-schema";
import { SurveyCard } from "@/app/components/admin/surveyCard";

const Articles = async () => {
  const response: string = await getSurveysAction()
  const surveys: ISuggestion[] = response ? JSON.parse(response as string) : [];
  return (
    <div className="flex flex-col lg:gap-0 bg-[#FDFDFD] lg:w-3/4 mx-auto shadow-md lg:py-0 overflow-hidden">
      <div className="flex items-center gap-4 py-4 pl-2 pr-0 lg:p-4 my-8">
        <h1 className="text-xl lg:text-4xl font-semibold capitalize">
          All Surveys ({surveys.length})
        </h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>
      {surveys.map((survey: ISuggestion, index: number) => (
        <SurveyCard key={index} survey={survey}/>
        // <p key={index}>{survey.title}</p> // need to add a component: SHUBHAM-TODO => create a Card component in components<admin
      ))}
      <p className="text-xs text-gray-500 my-3 text-center">Protected for Admins only.</p>
    </div>
  )
}

export default Articles
