'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CldUploadButton } from 'next-cloudinary';
import { Article as ArticleType } from "@/app/types/article";
import updateArticleAction from '@/app/Actions/update-article/updateArticle';
import { toast } from '@/hooks/use-toast';
import deleteArticleAction from '@/app/Actions/delete-article-action/deleteArticleAction';

interface FormData {
  _id: string;
  title: string;
  image: string | null;
  content: string;
  primary_tag: string;
  secondary_tags: string[];
}

type ArticleClientProps = {
  article: ArticleType;
};

export default function ArticleClient({ article }: ArticleClientProps) {
  const router = useRouter()
  const { register, handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      _id: article._id,
      title: article.title,
      image: article.image || null,
      content: article.content,
      primary_tag: article.primary_tag,
      secondary_tags: article.secondary_tags || [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(article.image || null);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateArticleAction({ ...data, _id: article._id });
      if (res.success) {

        //toast
        toast({
          title: 'Article updated successfully'
        })

        // Reset form
        setValue('title', '');
        setValue('image', null);
        setValue('content', '');
        setValue('primary_tag', '');
        setValue('secondary_tags', []);
        setImagePreview(null);
      } else {
        toast({
          title: 'Updation failed'
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'something went wrong'
      })
      router.push('/admin/articles');
    }

  };

  const onDelete = async () => {
    try {
      const res = await deleteArticleAction({ article_id: article._id || '' });
      if (res.success) {
        toast({
          title: 'Article deleted successfully'
        })
        router.push('/admin/articles')
      } else {
        toast({
          title: 'Deletion failed'
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'something went wrong'
      })
      router.push('/admin/articles');
    }
  };

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url;
    if (uploadedImageUrl) {
      setValue('image', uploadedImageUrl);
      setImagePreview(uploadedImageUrl);
    } else {
      console.error('Image URL is invalid');
    }
  };

  const primaryTags = [
    'department',
    'events',
    'placements',
    'college_life',
    'hostel',
    'library',
    'alumni',
    'scholarships',
    'admissions',
  ];

  const secondaryTags = ['CSE', 'IT', 'ITCA', 'MBA', 'MCA'];

  return (
    <div className="p-8 w-3/4 mx-auto rounded-lg shadow-md mb-4">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <div className='flex my-2 gap-2'>
        <p>Upvotes: {article.upvotes}</p>
        <p>Downvotes: {article.downvotes}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Upload Image</label>
          <CldUploadButton
            onSuccess={handleImageUpload}
            uploadPreset="mmmgkp-news"
          >
            <div className="cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Upload Image
            </div>
          </CldUploadButton>

          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-700"
                width={800}
                height={400}
              />
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Content</label>
          <textarea
            {...register('content', { required: 'Content is required' })}
            rows={8}
            className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Primary Tag */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Primary Tag</label>
          <Controller
            name="primary_tag"
            control={control}
            rules={{ required: 'Primary tag is required' }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a Primary Tag</option>
                {primaryTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* Secondary Tags */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Secondary Tags</label>
          <div className="flex flex-wrap gap-4">
            {secondaryTags.map((tag) => (
              <label key={tag} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tag}
                  {...register('secondary_tags')}
                  className="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-600">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex gap-16 w-full justify-between'>
          <button
            type="submit"
            className="w-36 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update
          </button>
          <button onClick={onDelete} className="w-36 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
