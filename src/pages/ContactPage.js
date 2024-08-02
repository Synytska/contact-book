import React, { useEffect, useState } from 'react';
import { getContactPage, createTag } from '../api/axios';
import { TextField, Button, Box, Avatar, Chip, CircularProgress, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

export const ContactPage = () => {
    const { id: contactId } = useParams();
    const [contact, setContact] = useState(null);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const contactPage = async () => {
            try {
                const response = await getContactPage(contactId);
                setContact(response.data.resources[0]);

                setTags(response.data.resources[0].tags || []);
            } catch (err) {
                alert('Failed to get contact. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        contactPage();
    }, [contactId]);

    const handleAddTag = async () => {
        try {
            if (tags.includes(newTag)) {
                alert('Tag already exists.');
                return;
            }

            const updatedTags = await createTag(contactId, tags, newTag);

            setTags(updatedTags);
            setNewTag('');
        } catch (err) {
            console.log(err.message);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Stack
                gap="26px"
                sx={{
                    '& .MuiFormControl-root': { margin: 0 },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 48
                    },
                    width: '100%',
                    maxWidth: '431px'
                }}
            >
                <h1 className="text-[20px]">Contact Details</h1>
                {contact && (
                    <>
                        <Box display="flex" gap="12px" alignItems="center">
                            <Avatar
                                src={contact.avatar_url}
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    width: '83px',
                                    height: '83px'
                                }}
                            />
                            <Box display="flex" flexDirection="column" sx={{ fontSize: '16px', fontWeight: '500' }}>
                                <Box display="flex">
                                    <p>
                                        {contact.fields['first name'][0].value} {contact.fields['last name'][0].value}
                                    </p>
                                </Box>
                                <p>{contact.fields.email[0].value}</p>
                            </Box>
                        </Box>

                        <Box>
                            <p className="mb-3">Tags</p>
                            {tags
                                ? tags.map((tag) => <Chip key={tag.id} label={tag.tag} sx={{ borderRadius: '4px', marginRight: 1 }} />)
                                : ''}
                        </Box>
                        <TextField
                            label="Add new Tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <Button
                            variant="outlined"
                            onClick={handleAddTag}
                            sx={{ color: '#191919', borderColor: '#AAAAAA', width: '100%', height: 44 }}
                        >
                            Add Tag
                        </Button>
                    </>
                )}
            </Stack>
        </Box>
    );
};

