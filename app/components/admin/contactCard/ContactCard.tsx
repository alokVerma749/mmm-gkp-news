import { ContactForm } from "@/app/models/contact-model";

interface ContactCardProps {
  contact: ContactForm;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="flex items-center justify-start p-4 mx-2 h-auto lg:mx-4 ">
      <div>
        <p className="text-lg font-semibold">{contact.name}</p>
      </div>
    </div>
  );
};
