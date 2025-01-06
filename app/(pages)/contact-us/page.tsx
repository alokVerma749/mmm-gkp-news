'use client'

import { toast } from '@/hooks/use-toast';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Message submitted successfully!',
        });
        reset();
      } else {
        toast({
          title: 'There was an error submitting your message.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error submitting message.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-3/4 mx-auto pt-16">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name (Required)
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email (Required)
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject (Required)
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject', { required: 'Subject is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message (Required)
        </label>
        <textarea
          id="message"
          {...register('message', { required: 'Message is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
