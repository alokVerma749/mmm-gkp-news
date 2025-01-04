import { cn } from "@/app/utils/lib";
import { LoaderIcon, Trash2Icon } from "lucide-react";

interface SpinnerProps {
  style?: string;
  color?: string;
  variant?: 'xsmall' | 'small' | 'medium' | 'large';
}

const sizeClasses = {
  xsmall: 'h-4 w-4',
  small: 'h-6 w-6',
  medium: 'h-8 w-8',
  large: 'h-12 w-12',
};

/**
 * @deprecated Please use Loader instead
 * @param param0 
 * @returns JSX.Element
 */
export function Spinner({ style, color = "white", variant = "medium" }: SpinnerProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <LoaderIcon color={color} className={cn(sizeClasses[variant], "animate-spin rounded-full", style)} />
    </div>
  );
}

export function Loader({ style, color = "white", variant = "medium" }: SpinnerProps) {
  return (
    <LoaderIcon color={color} className={cn(sizeClasses[variant], "animate-spin rounded-full", style)} />
  );
}

export function Deleting() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Trash2Icon className="animate-bounce text-red-500 w-8 h-8" />
      </div>
    </div>
  );
}
