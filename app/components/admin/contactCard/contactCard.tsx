import { ContactForm } from "@/app/models/contact-model";

export const ContactCard = ({ contact }: { contact: ContactForm }) => {
  return (
    <div className="h-full w-full flex sm:text-left md:p-4 relative min-h-28 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <div className="flex-1 w-full lg:pl-6 pr-3 lg:pr-0 flex flex-col justify-center overflow-hidden items-start py-3 lg:py-4">
        <h2 className="title-font font-semibold text-sm lg:text-xl text-gray-800 mb-2">Subject: {contact.subject}</h2>
        <h3 className="text-gray-700 text-xs lg:text-base mb-1">Name: {contact.name}</h3>
        <h3 className="text-gray-700 text-xs lg:text-base mb-1">Email: {contact.email}</h3>
        <p className="lg:mb-4 text-[#04594D] text-xs lg:text-lg leading-relaxed">{contact.message}</p>
      </div>
      <button className="bg-green-500 hover:bg-green-400 h-fit text-sm text-gray-100 p-1 rounded-sm mt-2">Mark Viewed</button>
    </div>
  );
};
