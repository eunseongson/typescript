import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import PlayButton from '../../../common/components/PlayButton';
import { IArtist } from '../../../models/artist';

interface IArtistsProps {
    artists: IArtist[];
}

const ArtistsContainer = styled(Box)({
    display: 'flex',
    gap: '16px',
    width: '100%',
});

const ArtistCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    flex: '1 1 0',
    minWidth: 0,
    maxWidth: 'calc((100% - 80px) / 6)',
    '&:hover': {
        backgroundColor: (theme.palette.background as any).gray || theme.palette.action.hover,
        transition: 'all 0.2s ease-out',
    },
}));

const ArtistImage = styled(Box)({
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    borderRadius: '50%',
    overflow: 'hidden',
    img: {
        width: '100%',
        height: '100%',
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

const ArtistInfo = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'left',
});

const ArtistName = styled(Typography)({
    color: 'text.primary',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
});

const Artists: React.FC<IArtistsProps> = ({ artists }) => {
    if (!artists || artists.length === 0) return null;

    return (
        <ArtistsContainer>
            {artists.map((artist, index) => {
                // IArtist에는 images가 없을 수 있으므로, 실제 API 응답 구조에 맞게 조정 필요
                // 여기서는 placeholder로 처리
                const imageUrl = (artist as any).images?.[0]?.url || '';

                return (
                    <ArtistCard key={artist.id || index}>
                        <ArtistImage>
                            {imageUrl ? (
                                <img src={imageUrl} alt={artist.name} />
                            ) : (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'background.gray',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant="h4" color="text.secondary">
                                        {artist.name?.[0]?.toUpperCase() || '?'}
                                    </Typography>
                                </Box>
                            )}
                            <PlayButton />
                        </ArtistImage>
                        <ArtistInfo>
                            <ArtistName variant="body2">{artist.name}</ArtistName>
                            <Typography variant="body2" color="text.secondary">
                                Artists
                            </Typography>
                        </ArtistInfo>
                    </ArtistCard>
                );
            })}
        </ArtistsContainer>
    );
};

export default Artists;

