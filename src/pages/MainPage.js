import React, { useEffect, useState } from 'react';

import { getContacts, deleteContacts, createContact } from '../api/axios';
import { FormComponent } from './FormComponent';
import { ContactListComponent } from '../components/ContactListComponent';

export const MainPage = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await getContacts();
                setContacts(data.resources);
            } catch (err) {
                setError('Failed to fetch contacts. Please try again later.');
            }
        };

        fetchContacts();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }
    const handleDelete = async (id) => {
        try {
            await deleteContacts(id);
            setContacts(contacts.filter((contact) => contact.id !== id));
        } catch (err) {
            setError('Failed to delete contacts. Please try again later.');
        }
    };
    const handleCreate = async (firstName, lastName, email, photoPreview) => {
        try {
            const newContact = await createContact(firstName, lastName, email);
            setContacts([
                {
                    ...newContact,
                    avatar_url: photoPreview
                },
                ...contacts
            ]);
        } catch (err) {
            setError('Failed to create contact. Please try again later.');
        }
    };

    return (
        <div className="flex gap-12">
            <FormComponent onCreate={handleCreate} />
            <ContactListComponent contacts={contacts} onDelete={handleDelete} />
        </div>
    );
};

