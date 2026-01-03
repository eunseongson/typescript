import { styled } from '@mui/system'
import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from '@mui/material';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import { getSpotifyAuthUrl } from '../../utils/auth';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const Layout = styled('div')({
    display: 'flex',
    gap: '20px',
    margin: '16px',
    alignItems: 'center'
})
const LibraryHead = () => {
    const { data: user } = useGetCurrentUserProfile();
    const { mutate: createPlaylist } = useCreatePlaylist();
    const handleCreatePlaylist = () => {
        // 나중에 추가 예정 
        if (!user) getSpotifyAuthUrl()
        createPlaylist({ name: 'New Playlist' });
    };
    return (
        <Layout>
            <BookmarkIcon />
            <Typography variant='h2' fontWeight={700} sx={{
                whiteSpace: 'nowrap',   // 줄바꿈 방지
            }}>
                Your Library
            </Typography>
            <Button onClick={handleCreatePlaylist}>
                <AddIcon color='success' />
            </Button>
        </Layout>
    )
}

export default LibraryHead