import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

import { getContacts, deleteContacts, createContact } from '../api/axios';
import { FormComponent } from './FormComponent';

export default function MainPage() {
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
            <div className="sticky top-[36px] h-screen">
                <FormComponent onCreate={handleCreate} />
            </div>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '558px'}}>
                <p className="text-[20px]">Contacts</p>

                <List
                    sx={{
                        '& .MuiListItem-root': { backgroundColor: '#EDEDED', borderRadius: 1, marginBottom: 2 },
                        '& .MuiAvatar-root': { bgcolor: 'transparent', width: 59, height: 59, marginRight: 2 }
                    }}
                >
                    {contacts.map((contact) => (
                        <ListItem key={contact.id} component={Link} to={`/contact/${contact.id}`}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                >
                                    {contact.avatar_url ? (
                                        <img src={contact.avatar_url} alt="avatar" />
                                    ) : (
                                        <AccountCircleIcon sx={{ width: 59, height: 59, color: '#191919' }} />
                                    )}
                                </Avatar>
                            </ListItemAvatar>
                            <Box sx={{ flex: 1 }}>
                                <Stack direction="row">
                                    <ListItemText
                                        primary={`${contact.fields['first name']?.[0]?.value || 'First Name'} ${
                                            contact.fields['last name']?.[0]?.value || 'Last Name'
                                        }`}
                                        secondary={contact.fields.email?.[0]?.value || 'Email'}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <IconButton aria-label="delete" size="small">
                                        <CancelOutlinedIcon fontSize="small" onClick={() => handleDelete(contact.id)} />
                                    </IconButton>
                                </Stack>

                                <Stack direction="row" sx={{ paddingBottom: '17px', flexWrap: 'wrap', gap: 1.5 }}>
                                    {contact.tags.map((index) => (
                                        <Chip label={index.tag} sx={{borderRadius: '4px'}}/>
                                    ))}
                                </Stack>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
}

