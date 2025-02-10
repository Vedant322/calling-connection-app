import { ToastContainer, toast } from "react-toastify";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import ContactsCard from "./components/ContactsCard";
import CreateAndUpdate from "./components/CreateAndUpdate";
import { FaRegSquarePlus } from "react-icons/fa6";
import { LuUserSearch } from "react-icons/lu";
import Navbar from "./components/Navbar";
import { db } from "./config/firebase";
import useDisclosure from "./Hooks/useDisclosure";
import NotFoundContact from "./components/NotFoundContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    onOpen();
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setContacts(contactsLists);
          return contactsLists;
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      const filteredContacts = contactsLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))

      setContacts(filteredContacts);
      return filteredContacts;
    })
  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <LuUserSearch className="text-white text-3xl absolute ml-1 cursor-pointer" />
            <input
              onChange={filterContacts}
              type="text"
              className="flex-grow h-10 rounded-md border bg-transparent border-white text-white pl-10"
              placeholder="Search contacts..." />
          </div>

          <FaRegSquarePlus
            onClick={onOpen}
            className="text-white text-5xl cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {contacts.length <= 0 ? (<NotFoundContact />) : (contacts.map((contact) => (
            <ContactsCard key={contact.id} contact={contact} />
          )
          ))}
        </div>
      </div>
      <ToastContainer position="botton-center" />
      <CreateAndUpdate
        isOpen={isOpen}
        onClose={() => {
          setSelectedContact(null); // Reset after closing
          onClose();
        }}
        isUpdate={!!selectedContact}
        contact={selectedContact ?? { name: "", email: "", id: null }}
      />

    </>
  );
}

export default App;