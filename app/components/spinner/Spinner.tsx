interface LoaderProps {
  variant?: "small" | "medium" | "large"
}

export function Loader({ variant = "medium" }: LoaderProps) {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-2",
    large: "h-12 w-12 border-3",
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[variant]} rounded-full border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent animate-spin`}
      />
    </div>
  )
}
