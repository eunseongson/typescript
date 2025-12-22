import { styled } from '@mui/system'
import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from '@mui/material';

const Layout = styled('div')({
    display: 'flex',
    gap: '20px',
    margin: '16px',
    alignItems: 'center'
})
const LibraryHead = () => {

    const handleCreatePlaylist = () => {
        // 나중에 추가 예정 
    };
    return (
        <Layout>
            <BookmarkIcon />
            <Typography variant='h2' fontWeight={700}>
                Your Library
            </Typography>
            <Button onClick={handleCreatePlaylist}>
                <AddIcon color='success' />
            </Button>
        </Layout>
    )
}

export default LibraryHead