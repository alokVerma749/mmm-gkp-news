import type { Metadata } from "next"
import getArticlesAction from "@/app/Actions/get-paginated-articles/getArticles"
import type { Article as ArticleType } from "@/app/types/article"
import { ArticleList } from "@/app/components/articleList"
import { InfiniteScrollList } from "@/app/components/infiniteScrollList"
import { ChevronRight, Newspaper, TrendingUp } from "lucide-react"
import Link from "next/link"

type ArticleProps = {
  params: Promise<{ article_tag: string }>
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { article_tag } = await params

  if (!article_tag) {
    return {
      title: "Articles Not Found",
      description: "The requested articles were not found.",
    }
  }

  return {
    title: `${article_tag.toUpperCase()} - MMMUT GKP NEWS`,
    description: `Read the latest updates and news about ${article_tag}. Stay informed with the most recent articles on ${article_tag} at MMMUT GKP NEWS.`,
  }
}

export default async function Article({ params }: ArticleProps) {
  const { article_tag } = await params

  // Fetch initial articles
  const response1: string = await getArticlesAction({
    primary_tag: article_tag,
    limit: 10,
    page: 1,
  })

  const response2: string = await getArticlesAction({
    primary_tag: article_tag,
    limit: 10,
    page: 2,
  })

  const initialArticles: ArticleType[] = response1 ? JSON.parse(response1 as string) : []
  const nextArticles: ArticleType[] = response2 ? JSON.parse(response2 as string) : []

  // Get category information
  const categoryInfo = getCategoryInfo(article_tag)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
              <Newspaper className="w-4 h-4 mr-2" />
              Category
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              {categoryInfo.title}
            </h1>
            <p className="mt-6 text-xl text-gray-100 max-w-3xl">{categoryInfo.description}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white bg-opacity-20 text-white backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                {initialArticles.length + nextArticles.length}+ Articles
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white bg-opacity-20 text-white backdrop-blur-sm">
                <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                Updated Daily
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <div>
                <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 h-4 w-4 text-gray-400" />
                <Link
                  href="/categories"
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Categories
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 h-4 w-4 text-gray-400" />
                <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  {article_tag.charAt(0).toUpperCase() + article_tag.slice(1).replace("_", " ")}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">About this category</h3>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{categoryInfo.about}</p>
                  <div className="mt-6 space-y-3">
                    {categoryInfo.tags.map((tag, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        <span className="text-gray-600 dark:text-gray-300">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Related Categories</h3>
                </div>
                <div className="px-6 py-5">
                  <ul className="space-y-3">
                    {categoryInfo.related.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={`/${item.toLowerCase().replace(" ", "_")}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Latest Articles</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {initialArticles.length + nextArticles.length}+ articles
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Render static initial articles */}
                <ArticleList article_tag={article_tag} articles={initialArticles} />

                {/* Infinite scroll for additional articles */}
                {nextArticles.length > 0 && (
                  <InfiniteScrollList article_tag={article_tag} initialArticles={nextArticles} initialPage={3} />
                )}

                {initialArticles.length === 0 && nextArticles.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      We could not find any articles in this category. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get category information
function getCategoryInfo(tag: string) {
  const categories = {
    department: {
      title: "Department News & Updates",
      description: "Stay updated with the latest news, events, and announcements from all departments at MMMUT.",
      about:
        "The Department category covers all academic departments at MMMUT, featuring news about faculty achievements, curriculum updates, and departmental events.",
      tags: ["Faculty News", "Academic Updates", "Research Highlights", "Department Events"],
      related: ["Events", "Placements", "Scholarships"],
    },
    events: {
      title: "Campus Events & Activities",
      description:
        "Discover upcoming events, workshops, seminars, and cultural activities happening across the MMMUT campus.",
      about:
        "The Events category keeps you informed about all the exciting activities happening on campus, from technical workshops to cultural festivals.",
      tags: ["Technical Fests", "Workshops", "Seminars", "Cultural Events"],
      related: ["Department", "College Life", "Alumni"],
    },
    placements: {
      title: "Placement Updates & Career News",
      description:
        "Get the latest information about campus placements, job opportunities, and career development resources.",
      about:
        "The Placements category provides valuable information about recruitment drives, company visits, and success stories of MMMUT graduates.",
      tags: ["Job Opportunities", "Company Visits", "Interview Preparation", "Success Stories"],
      related: ["Department", "Alumni", "Scholarships"],
    },
    college_life: {
      title: "Campus Life & Student Experiences",
      description:
        "Experience the vibrant campus life at MMMUT through stories, experiences, and day-to-day activities of students.",
      about:
        "The College Life category captures the essence of student life at MMMUT, featuring stories about clubs, activities, and campus experiences.",
      tags: ["Student Clubs", "Campus Activities", "Student Stories", "Campus Facilities"],
      related: ["Events", "Hostel", "Library"],
    },
    hostel: {
      title: "Hostel Life & Accommodation Updates",
      description:
        "Everything you need to know about hostel life, accommodation facilities, and related announcements at MMMUT.",
      about:
        "The Hostel category provides information about accommodation facilities, hostel rules, and the vibrant community life in MMMUT hostels.",
      tags: ["Accommodation", "Hostel Rules", "Facilities", "Community Events"],
      related: ["College Life", "Events", "Library"],
    },
    library: {
      title: "Library Resources & Updates",
      description: "Explore the vast resources, new additions, and special collections available at the MMMUT library.",
      about:
        "The Library category keeps you informed about the latest resources, digital collections, and special events at the MMMUT library.",
      tags: ["New Books", "Digital Resources", "Study Spaces", "Library Events"],
      related: ["Department", "College Life", "Scholarships"],
    },
    alumni: {
      title: "Alumni Network & Success Stories",
      description: "Connect with the MMMUT alumni network and read inspiring success stories of our graduates.",
      about:
        "The Alumni category celebrates the achievements of MMMUT graduates and provides information about alumni events and networking opportunities.",
      tags: ["Success Stories", "Alumni Events", "Networking", "Career Achievements"],
      related: ["Placements", "Events", "Department"],
    },
    scholarships: {
      title: "Scholarships & Financial Aid",
      description:
        "Find information about scholarships, financial aid, and other funding opportunities available for MMMUT students.",
      about:
        "The Scholarships category provides comprehensive information about financial support options, application processes, and eligibility criteria.",
      tags: ["Financial Aid", "Merit Scholarships", "Research Grants", "Application Guides"],
      related: ["Admissions", "Department", "Placements"],
    },
    admissions: {
      title: "Admission Process & Requirements",
      description:
        "Get detailed information about admission procedures, eligibility criteria, and important dates for MMMUT programs.",
      about:
        "The Admissions category guides prospective students through the application process, entrance exams, and admission requirements for various programs.",
      tags: ["Application Process", "Entrance Exams", "Eligibility Criteria", "Important Dates"],
      related: ["Scholarships", "Department", "Hostel"],
    },
    default: {
      title: `${tag.charAt(0).toUpperCase() + tag.slice(1).replace("_", " ")} News & Updates`,
      description: `Stay updated with the latest news and information about ${tag.replace("_", " ")} at MMMUT GKP.`,
      about: `This category provides comprehensive coverage of all ${tag.replace("_", " ")}-related news and updates at MMMUT.`,
      tags: ["Latest Updates", "Important Announcements", "Featured News"],
      related: ["Events", "Department", "College Life"],
    },
  }

  return categories[tag as keyof typeof categories] || categories.default
}
