'use client';

import publishArticleAction from '@/app/Actions/publish-article/publishArticle';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  title: string;
  image: string | null; // Store image URL from Cloudinary
  content: string;
  primary_tag: string;
  secondary_tags: string[];
}

const Editor: React.FC = () => {
  const { register, handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      title: '',
      image: null,
      content: '',
      primary_tag: '',
      secondary_tags: [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log('Form Data Submitted:', data); // Verify if `image` is populated
    await publishArticleAction(data);
  };

  const handleImageUpload = (result: any) => {
    console.log('Upload Result:', result);
    const uploadedImageUrl = result?.info?.secure_url;
    if (uploadedImageUrl) {
      console.log('Setting Image Value:', uploadedImageUrl);
      setValue('image', uploadedImageUrl); // Ensure this updates the form state
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
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 text-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Create/Edit Article</h1>
      <form onSubmit={handleSubmit(async (data) => await onSubmit(data))} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-400">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-400">Upload Image</label>
          <CldUploadButton
            onSuccess={handleImageUpload} // For handling upload success
            onClose={() => console.log('Upload widget closed')} // Triggered when "Done" is clicked
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
                className="w-full h-48 object-cover rounded-lg border border-gray-700"
              />
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-400">Content</label>
          <textarea
            {...register('content', { required: 'Content is required' })}
            rows={8}
            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Primary Tag */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-400">Primary Tag</label>
          <Controller
            name="primary_tag"
            control={control}
            rules={{ required: 'Primary tag is required' }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <label className="block text-sm font-medium mb-1 text-gray-400">Secondary Tags</label>
          <div className="flex flex-wrap gap-4">
            {secondaryTags.map((tag) => (
              <label key={tag} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tag}
                  {...register('secondary_tags')}
                  className="w-4 h-4 text-indigo-500 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-400">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
