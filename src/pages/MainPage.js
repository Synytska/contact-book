import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { getContacts, deleteContacts, createContact } from '../api/axios';
import { FormComponent } from './FormComponent';

export default function MainPage() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await getContacts();
                console.log(data.resources);
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
    const handleCreate = async (firstName, lastName, email) => {
        try {
            const newContact = await createContact(firstName, lastName, email);
            setContacts([newContact, ...contacts]);
        } catch (err) {
            setError('Failed to create contact. Please try again later.');
        }
    };

    return (
        <div className="flex gap-10">
            <div className="sticky top-[36px] h-screen">
                <FormComponent onCreate={handleCreate} />
            </div>
            <div className="flex flex-col w-full">
                <p className="text-[20px]">Contacts</p>

                <List
                    sx={{
                        '& .MuiListItem-root': { backgroundColor: '#EDEDED', borderRadius: 1, marginBottom: 2 },
                        '& .MuiAvatar-root': { bgcolor: 'transparent', width: 59, height: 59, marginRight: 2 }
                    }}
                >
                    {contacts.map((contact) => (
                        <ListItem key={contact.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    {contact.avatar_url ? (
                                        <img
                                            src={contact.avatar_url}
                                            alt={`${contact.fields['first name']?.[0]?.value}`}
                                        />
                                    ) : (
                                        <AccountCircleOutlinedIcon sx={{ width: 59, height: 59, color: '#191919' }} />
                                    )}
                                </Avatar>
                            </ListItemAvatar>
                            <Box sx={{ flex: 1 }}>
                                <Stack direction="row">
                                    <ListItemText
                                        primary={`${contact.fields['first name']?.[0]?.value || 'First Name'} ${contact.fields['last name']?.[0]?.value || 'Last Name'}`}
                                        secondary={contact.fields.email?.[0]?.value || 'Email'}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <IconButton aria-label="delete" size="small">
                                        <CancelOutlinedIcon fontSize="small" onClick={() => handleDelete(contact.id)} />
                                    </IconButton>
                                </Stack>

                                <Stack direction="row" spacing={1} sx={{ paddingBottom: '17px' }}>
                                    {contact.tags.map((index) => (
                                        <Chip label={index.tag} />
                                    ))}
                                </Stack>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
}

