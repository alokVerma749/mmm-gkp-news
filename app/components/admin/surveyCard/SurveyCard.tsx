import { ISuggestion } from "@/app/models/survey-schema";

interface SurveyCardProps {
  survey: ISuggestion;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({ survey }) => {
  return (
    <div className="flex flex-col justify-start p-4 mx-2 lg:mx-4 h-auto border rounded-lg shadow-sm">
      <p className="text-lg font-semibold">{survey.title}</p>
    </div>
  );
};
