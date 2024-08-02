import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';

import { useState } from 'react';

export const FormComponent = ({ onCreate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);

    const [photoPreview, setPhotoPreview] = useState('');

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleCreate = async () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError(null);

        try {
            await onCreate(firstName, lastName, email, photoPreview);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhotoPreview('');
        } catch (err) {
            alert('Failed creating contacts. Please try again later.');
        }
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('File size should not exceed 5MB.');
                return;
            }
            setPhotoPreview(URL.createObjectURL(file));
        }
    };
    return (
        <div>
            <h1 className="text-[20px]">Create Contact</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '30ch' },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: 48
                    }
                }}
                noValidate
                autoComplete="off"
            >
                <div className="flex flex-col my-[20px] gap-4">
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            margin: 'auto',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            '& .MuiSvgIcon-root': {
                                width: 100,
                                height: 100
                            }
                        }}
                    >
                        {photoPreview ? (
                            <img alt="user preview img" src={photoPreview} className="object-cover min-h-full" />
                        ) : (
                            <AccountCircleIcon fontSize="large" />
                        )}
                    </Avatar>

                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        sx={{ borderColor: '#AAAAAA' }}
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload photo
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={handlePhotoChange} />
                    </Button>

                    <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={firstName.length > 0 && firstName.length < 3}
                        helperText={
                            firstName.length > 0 && firstName.length < 3
                                ? 'First name must be at least 3 characters.'
                                : ''
                        }
                    />
                    <TextField
                        required
                        id="outlined-lastname-input"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={lastName.length > 0 && lastName.length < 3}
                        helperText={
                            lastName.length > 0 && lastName.length < 3 ? 'Last name must be at least 3 characters.' : ''
                        }
                    />
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        autoComplete="current-email"
                        value={email}
                        error={!!emailError}
                        helperText={emailError}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button
                    variant="outlined"
                    sx={{ color: '#191919', borderColor: '#AAAAAA', width: '100%', height: 44 }}
                    onClick={handleCreate}
                >
                    <span>Add Contact</span>
                </Button>
            </Box>
        </div>
    );
};

