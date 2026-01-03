import React from 'react'
import { Button, styled, Typography } from '@mui/material'
import { IUser } from '../../models/user'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import { getSpotifyAuthUrl } from '../../utils/auth'
import useCreatePlaylist from '../../hooks/useCreatePlaylist'

const EmptyPlaylistWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.secondary,
    borderRadius: '8px',
    margin: '4px',
    padding: '25px',
    height: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}))

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '32px',
    width: '150px',
    fontSize: '16px',
    fontWeight: '700',
    padding: '6px 20px',
    backgroundColor: theme.palette.secondary.main,
    color: 'black'
}))
const EmptyPlaylist = () => {
    const { data: user } = useGetCurrentUserProfile();
    const { mutate: createPlaylist } = useCreatePlaylist();
    const handleCreatePlaylist = () => {
        if (!user) {
            getSpotifyAuthUrl();
            return;
        }
        createPlaylist({ name: 'New Playlist' });
    }
    return (
        <EmptyPlaylistWrapper>
            <div>
                <Typography variant='h2' fontWeight={700}>Create your first playlist</Typography>
                <Typography variant='body1'>It's easy, we'll help you</Typography>
            </div>
            <StyledButton onClick={handleCreatePlaylist}>Create playlist</StyledButton>
        </EmptyPlaylistWrapper>
    )
}

export default EmptyPlaylist