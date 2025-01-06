'use client'

import { toast } from '@/hooks/use-toast';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';

type FormData = {
  complaint: string;
  articleLinks: string[];
  proof?: string;
  name?: string;
  email?: string;
};

const ComplaintForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>({
    defaultValues: {
      articleLinks: [''],
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'articleLinks',
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Complaint registered successfully!'
        })
        reset();
      } else {
        toast({
          title: 'There was an error submitting the complaint.'
        })
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error submitting complaint.'
      })
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-3/4 mx-auto pt-16">
      <h1 className="text-2xl font-bold text-center mb-6">Complaint Form</h1>

      <div>
        <label htmlFor="complaint" className="block text-sm font-medium text-gray-700">
          Complaint Description (Required)
        </label>
        <textarea
          id="complaint"
          {...register('complaint', { required: 'Complaint description is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.complaint && <p className="text-red-500 text-sm">{errors.complaint.message}</p>}
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label htmlFor="articleLinks" className="block text-sm font-medium text-gray-700">
          Related Article Links (Optional)
        </label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex space-x-2">
            <input
              type="url"
              {...register(`articleLinks.${index}` as const)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder={`Article Link ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-2 m-1 bg-red-500 text-white text-sm rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append('')} // Add new empty input field
          className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
        >
          Add Article Link
        </button>
      </div>

      <div>
        <label htmlFor="proof" className="block text-sm font-medium text-gray-700">
          Related Proof (URL or file upload) (Optional)
        </label>
        <input
          type="text"
          id="proof"
          {...register('proof')}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit Complaint
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;
