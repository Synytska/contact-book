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
            <Stack>
            <h1>Contact Details</h1>
            {contact && (
                <>
                    <Avatar src={contact.avatar_url} />
                    <p>
                        {contact.fields['first name'][0].value} {contact.fields['last name'][0].value}
                    </p>
                    <p>{contact.fields.email[0].value}</p>
                    <Box>
                        {tags.map((tag) => (
                            <Chip key={tag.id} label={tag.tag} />
                        ))}
                    </Box>
                    <TextField
                        label="New Tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <Button onClick={handleAddTag}>Add Tag</Button>
                </>
            )}
            </Stack>
        </Box>
    );
};

