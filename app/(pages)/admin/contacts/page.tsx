import getContactsAction from "@/app/Actions/get-contacts/getComplaints";
import { ContactForm } from "@/app/models/contact-model";
import { ContactCard } from "@/app/components/admin/contactCard";

const Articles = async () => {
  const response: string = await getContactsAction()
  const contacts: ContactForm[] = response ? JSON.parse(response as string) : [];
  return (
    <div className="flex flex-col lg:gap-0 bg-[#FDFDFD] lg:w-3/4 mx-auto shadow-md lg:py-0 overflow-hidden">
      <div className="flex items-center gap-4 py-4 pl-2 pr-0 lg:p-4 my-8">
        <h1 className="text-xl lg:text-4xl font-semibold capitalize">
          All Contacts ({contacts.length})
        </h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>
      {contacts.map((contact: ContactForm, index: number) => (
        <ContactCard key={index} contact={contact}/>
        // <p key={index}>{contact.name}</p> // need to add a component: SHUBHAM-TODO => create a Card component in components<admin
      ))}
      <p className="text-xs text-gray-500 my-3 text-center">Protected for Admins only.</p>
    </div>
  )
}

export default Articles;
