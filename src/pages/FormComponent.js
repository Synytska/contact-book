import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import {LoadingButton} from '@mui/lab/LoadingButton';

import { useState } from 'react';

export const FormComponent = ({ onCreate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleCreate = async () => {
        // if (!firstName || !lastName) {
        //     setEmailError('Either first name or last name is required.');
        //     return;
        // }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError(null);

        try {
            await onCreate(firstName, lastName, email);
            setFirstName('');
            setLastName('');
            setEmail('');
        } catch (err) {
            alert('Failed creating contacts. Please try again later.');
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
                    <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-lastname-input"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                <LoadingButton
                    variant="outlined"
                    sx={{ color: '#191919', borderColor: '#AAAAAA', width: '100%', height: 44 }}
                    onClick={handleCreate}
                >
                    <span>Add Contact</span>
                </LoadingButton>
            </Box>
        </div>
    );
};

