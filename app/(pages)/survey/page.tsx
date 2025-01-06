'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const tags: string[] = [
  "Department",
  "Hostel",
  "Library",
  "Events",
  "Placements",
  "College Life",
  "Alumni",
  "Admissions",
  "Scholarships",
  "Other"
];

type FormData = {
  title: string;
  description: string;
  category: string;
  relatedLinks?: string;
  name?: string;
  email?: string;
};

const SurveyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: 'Thank you for your efforts.'
        });
      } else {
        toast({
          title: 'There was an error submitting the suggestion.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error submitting suggestion.'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Suggest a News Article</h1>

      {submitted ? (
        <div className="text-green-500 text-center">
          <p>Thank you for your suggestion! We&rsquo;ll review it shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              News Title (Required)
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { required: 'Title is required' })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (Required)
            </label>
            <textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category (Required)
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Category</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div>
            <label htmlFor="relatedLinks" className="block text-sm font-medium text-gray-700">
              Related Links (Optional)
            </label>
            <input
              type="url"
              id="relatedLinks"
              {...register('relatedLinks')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Provide any related link or source"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit Suggestion
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SurveyForm;
