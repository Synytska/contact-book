import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import IconButton from '@mui/material/IconButton';

import { Link } from 'react-router-dom';

export const HeaderComponent = () => {
    return (
        <div className="bg-black w-full flex justify-between px-12 py-4 text-center items-center">
            <h1 className="text-[#f0f8ff] text-2xl">Contact Book</h1>
            <IconButton component={Link} to={`/`}>
            <HomeRoundedIcon  sx={{color: '#ffffff', width: '34px', height: '34px'}}/>
            </IconButton>
        </div>
    );
};
