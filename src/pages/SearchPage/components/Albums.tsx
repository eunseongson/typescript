import React from 'react';
import { Grid2, Typography, styled } from '@mui/material';
import PlayButton from '../../../common/components/PlayButton';
import { ISimplifiedAlbum } from '../../../models/album';

interface IAlbumsProps {
    albums: ISimplifiedAlbum[];
}

const AlbumImageContainer = styled('div')({
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    img: {
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        objectFit: 'cover',
    },
    button: {
        opacity: 0,
        transition: 'all 0.3s ease-out',
    },
    '&:hover': {
        button: {
            opacity: 1,
        },
    },
});

const AlbumCardLayout = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
});

const Albums: React.FC<IAlbumsProps> = ({ albums }) => {
    if (!albums || albums.length === 0) return null;

    return (
        <Grid2 container spacing={2}>
            {albums.map((album, index) => {
                const imageUrl = album.images?.[1]?.url || album.images?.[0]?.url || '';
                const artistNames = album.artists?.map(a => a.name).join(', ') || 'Unknown Artist';

                return (
                    <Grid2 size={{ xs: 6, sm: 4, md: 2 }} key={album.id || index}>
                        <AlbumCardLayout>
                            <AlbumImageContainer>
                                {imageUrl && <img src={imageUrl} alt={album.name} />}
                                <PlayButton />
                            </AlbumImageContainer>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '14px' } }} noWrap>
                                {album.name}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '14px' } }} color="text.secondary" noWrap>
                                {artistNames}
                            </Typography>
                        </AlbumCardLayout>
                    </Grid2>
                );
            })}
        </Grid2>
    );
};

export default Albums;

