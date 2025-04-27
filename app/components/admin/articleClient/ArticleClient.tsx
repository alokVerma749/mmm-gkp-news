"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CldUploadButton } from "next-cloudinary"
import type { Article as ArticleType } from "@/app/types/article"
import updateArticleAction from "@/app/Actions/update-article/updateArticle"
import { toast } from "@/hooks/use-toast"
import deleteArticleAction from "@/app/Actions/delete-article-action/deleteArticleAction"
import { Trash2, Save } from "lucide-react"

interface FormData {
  _id: string
  title: string
  description: string
  image: string | null
  content: string
  primary_tag: string
  secondary_tags: string[]
}

type ArticleClientProps = {
  article: ArticleType
}

export default function ArticleClient({ article }: ArticleClientProps) {
  const router = useRouter()
  const { register, handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      _id: article._id,
      title: article.title,
      description: article.description,
      image: article.image || null,
      content: article.content,
      primary_tag: article.primary_tag,
      secondary_tags: article.secondary_tags || [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(article.image || null)
  const [isDeleting, setIsDeleting] = useState(false)

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateArticleAction({ ...data, _id: article._id })
      if (res.success) {
        toast({
          title: "Article updated successfully",
        })
        router.push("/admin/articles")
      } else {
        toast({
          title: "Update failed",
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Something went wrong",
      })
      router.push("/admin/articles")
    }
  }

  const onDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true)
      return
    }

    try {
      const res = await deleteArticleAction({ article_id: article._id || "" })
      if (res.success) {
        toast({
          title: "Article deleted successfully",
        })
        router.push("/admin/articles")
      } else {
        toast({
          title: "Deletion failed",
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Something went wrong",
      })
      router.push("/admin/articles")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url
    if (uploadedImageUrl) {
      setValue("image", uploadedImageUrl)
      setImagePreview(uploadedImageUrl)
    } else {
      console.error("Image URL is invalid")
    }
  }

  const primaryTags = [
    "department",
    "events",
    "placements",
    "college_life",
    "hostel",
    "library",
    "alumni",
    "scholarships",
    "admissions",
  ]

  const secondaryTags = ["CSE", "IT", "ITCA", "MBA", "MCA"]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Editor Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Article</h1>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                ID: {(article._id || '').substring(0, 8)}...
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">👍 {article.upvotes}</span>
            </div>
            <div className="flex items-center space-x-1 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-red-600 dark:text-red-400">👎 {article.downvotes}</span>
            </div>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        <form className="flex flex-col md:flex-row h-full">
          {/* Main Editor Area */}
          <div className="flex-1 p-6 border-r border-gray-200 dark:border-gray-700">
            {/* Title */}
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Article Title"
              className="w-full text-3xl font-bold border-0 focus:ring-0 focus:outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 mb-4"
            />

            {/* Description */}
            <input
              {...register("description", { required: "Description is required" })}
              type="text"
              placeholder="Add a brief description..."
              className="w-full text-lg border-0 focus:ring-0 focus:outline-none bg-transparent text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 mb-6"
            />

            {/* Content Editor */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Content Editor</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">Markdown supported</span>
              </div>
              <textarea
                {...register("content", { required: "Content is required" })}
                rows={16}
                placeholder="Write your article content here..."
                className="w-full p-4 border-0 focus:ring-0 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none font-mono text-sm"
              />
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="w-full md:w-80 bg-gray-50 dark:bg-gray-900 p-6 space-y-6">
            {/* Featured Image */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</h3>
              {imagePreview ? (
                <div className="relative group">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Featured Image"
                    className="w-full h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    width={800}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <CldUploadButton
                      onSuccess={handleImageUpload}
                      uploadPreset="mmmgkp-news"
                      className="text-sm text-white underline"
                    >
                      Change Image
                    </CldUploadButton>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                  <CldUploadButton onSuccess={handleImageUpload} uploadPreset="mmmgkp-news">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500">
                          Upload an image
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </CldUploadButton>
                </div>
              )}
            </div>

            {/* Primary Tag */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary Category</h3>
              <Controller
                name="primary_tag"
                control={control}
                rules={{ required: "Primary tag is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a Primary Category</option>
                    {primaryTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Secondary Tags */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</h3>
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-3">
                <div className="grid grid-cols-2 gap-2">
                  {secondaryTags.map((tag) => (
                    <label key={tag} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={tag}
                        {...register("secondary_tags")}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Publishing Options */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>

              <button
                type="button"
                onClick={onDelete}
                className={`w-full flex justify-center items-center px-4 py-2 border rounded-md font-medium transition-colors duration-200 ${isDeleting
                    ? "bg-red-600 text-white border-transparent hover:bg-red-700"
                    : "bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
                  }`}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Confirm Delete" : "Delete Article"}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
