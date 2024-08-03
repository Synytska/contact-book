import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export const HeaderComponent = () => (
    <Box
        sx={{
            background: '#191919',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: 12,
            paddingY: 4,
            textAlign: 'center',
            alignItems: 'center'
        }}
    >
        <h1 className="text-[#f0f8ff] text-2xl">Contact Book</h1>
        <IconButton component={Link} to={`/`}>
            <HomeRoundedIcon sx={{ color: '#ffffff', width: '34px', height: '34px' }} />
        </IconButton>
    </Box>
);

