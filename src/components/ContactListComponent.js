import { Link } from 'react-router-dom';

import { List, ListItem, ListItemText, ListItemAvatar, Box, Avatar, IconButton, Chip, Stack } from '@mui/material';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ContactListComponent = ({ contacts, onDelete }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onDelete(contact.id);
                                    }}
                                >
                                    <CancelOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Stack>

                            <Stack direction="row" sx={{ paddingBottom: '17px', flexWrap: 'wrap', gap: 1.5 }}>
                                {contact.tags.map((index) => (
                                    <Chip
                                        key={`${index.id}/${index.tag}`}
                                        label={index.tag}
                                        sx={{ borderRadius: '4px' }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
