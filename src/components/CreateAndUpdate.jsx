import * as Yup from "yup"

import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import Modal from "./Modal";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
})


const CreateAndUpdate = ({ isOpen, onClose, isUpdate, contact = { name: "", email: "", id: null } }) => {

    const addContacts = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact Added Successfully");
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const updateContact = async (contact, id) => {
        if (!id) {
            console.error("Error: Missing contact ID for update!");
            return;
        }
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("Contact Updated Successfully");
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik
                    validationSchema={contactSchemaValidation}
                    initialValues={{
                        name: contact?.name ?? "",
                        email: contact?.email ?? "",
                    }}
                    onSubmit={async (values) => {
                        if (isUpdate && contact?.id) {
                            await updateContact(values, contact.id);
                        } else {
                            await addContacts(values);
                        }
                        onClose();
                    }}
                >
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <Field name="name" className="h-10 border" />
                            <div className="text-xs text-red-500">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="h-10 border" />
                            <div className="text-xs text-red-500">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <button type="submit" className="bg-orange px-3 py-1.5 self-end">
                            {isUpdate ? "Update" : "Add"} Contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
};

export default CreateAndUpdate;
