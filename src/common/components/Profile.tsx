import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import { Menu, MenuItem, Typography } from '@mui/material';

interface IProfileProps {
    imageUrl?: string;
}

const ImgProfile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    @media (max-width: 600px) {
        width: 32px;
        height: 32px;
    }
`;

const Profile = (props: IProfileProps) => {
    const { imageUrl } = props;
    const settings = ['Profile', 'Logout'];
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (setting: string) => {
        if (setting === 'Logout') {
            localStorage.removeItem('access_token');
            window.location.reload();
        }
        setAnchorElUser(null);
    };
    return (
        <>
            <div onClick={handleOpenUserMenu}>
                {imageUrl ? <ImgProfile src={imageUrl} alt="Profile" /> : <AccountCircleIcon style={{ width: 40, height: 40, cursor: 'pointer' }} />}
            </div >
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default Profile