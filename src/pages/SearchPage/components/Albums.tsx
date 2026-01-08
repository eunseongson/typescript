import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import PlayButton from '../../../common/components/PlayButton';
import { ISimplifiedAlbum } from '../../../models/album';

interface IAlbumsProps {
    albums: ISimplifiedAlbum[];
}

const AlbumsContainer = styled(Box)({
    display: 'flex',
    gap: '16px',
    width: '100%',
});

const AlbumCard = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    cursor: 'pointer',
    flex: '1 1 0',
    minWidth: 0,
    maxWidth: 'calc((100% - 80px) / 6)',
});

const AlbumImageContainer = styled(Box)({
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

const AlbumTitle = styled(Typography)({
    color: 'text.primary',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const AlbumArtist = styled(Typography)({
    color: 'text.secondary',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const Albums: React.FC<IAlbumsProps> = ({ albums }) => {
    if (!albums || albums.length === 0) return null;

    return (
        <AlbumsContainer>
            {albums.map((album, index) => {
                const imageUrl = album.images?.[1]?.url || album.images?.[0]?.url || '';
                const artistNames = album.artists?.map(a => a.name).join(', ') || 'Unknown Artist';

                return (
                    <AlbumCard key={album.id || index}>
                        <AlbumImageContainer>
                            {imageUrl && <img src={imageUrl} alt={album.name} />}
                            <PlayButton />
                        </AlbumImageContainer>
                        <div>
                            <AlbumTitle variant="body2">{album.name}</AlbumTitle>
                            <Typography variant="body2" color="text.secondary">
                                {artistNames}
                            </Typography>
                        </div>
                    </AlbumCard>
                );
            })}
        </AlbumsContainer>
    );
};

export default Albums;

