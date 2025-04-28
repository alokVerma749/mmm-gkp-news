export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Format: "May 15, 2023"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
