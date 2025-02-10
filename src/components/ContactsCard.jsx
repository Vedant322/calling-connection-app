import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditBoxLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore"
import CreateAndUpdate from "./CreateAndUpdate";
import useDisclosure from "../Hooks/useDisclosure";
import { toast } from "react-toastify";

const ContactsCard = ({ contact }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.success("Contact Deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div key={contact.id} className="flex items-center gap-3 p-2 border-b border-gray-600 bg-white rounded-xl justify-between">
                <HiOutlineUserCircle className="text-gray text-4xl" />
                <div className="text-black flex-grow">
                    <h2 className="text-lg font-medium">{contact.name}</h2>
                    <p className="text-sm text-gray-300">{contact.email}</p>
                </div>
                <div className="flex gap-2">
                    <RiEditBoxLine onClick={onOpen} className="text-blue-400 cursor-pointer text-2xl" title="Edit" />
                    <IoMdTrash onClick={() => deleteContact(contact.id)} className="text-red-500 cursor-pointer text-2xl" title="Delete" />
                </div>
            </div>
            <CreateAndUpdate isUpdate isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ContactsCard