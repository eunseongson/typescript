import React from 'react';
import { Grid2, Typography, styled, Box } from '@mui/material';
import PlayButton from '../../../common/components/PlayButton';
import { IArtist } from '../../../models/artist';

interface IArtistsProps {
    artists: IArtist[];
}

const ArtistCardLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: (theme.palette.background as any).gray || theme.palette.action.hover,
        transition: 'all 0.2s ease-out',
        '& button': {
            opacity: 1,
        },
    },
}));

const ArtistImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
});

const ArtistImage = styled(Box)({
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});

const PlayButtonWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    button: {
        opacity: 0,
        transition: 'all 0.3s ease-out',
    },
    [theme.breakpoints.down('md')]: {
        bottom: '6px',
        right: '6px',
        button: {
            width: '45px !important',
            height: '45px !important',
            svg: {
                width: '22px',
                height: '22px',
            },
        },
    },
    [theme.breakpoints.down('sm')]: {
        bottom: '4px',
        right: '4px',
        button: {
            width: '36px !important',
            height: '36px !important',
            svg: {
                width: '18px',
                height: '18px',
            },
        },
    },
}));

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
        <Grid2 container spacing={2}>
            {artists.map((artist, index) => {
                // IArtist에는 images가 없을 수 있으므로, 실제 API 응답 구조에 맞게 조정 필요
                // 여기서는 placeholder로 처리
                const imageUrl = (artist as any).images?.[0]?.url || '';

                return (
                    <Grid2 size={{ xs: 6, sm: 3, md: 2 }} key={artist.id || index}>
                        <ArtistCardLayout>
                            <ArtistImageContainer>
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
                                </ArtistImage>
                                <PlayButtonWrapper>
                                    <PlayButton />
                                </PlayButtonWrapper>
                            </ArtistImageContainer>
                            <ArtistInfo>
                                <ArtistName variant="body2">{artist.name}</ArtistName>
                                <Typography variant="body2" color="text.secondary">
                                    Artists
                                </Typography>
                            </ArtistInfo>
                        </ArtistCardLayout>
                    </Grid2>
                );
            })}
        </Grid2>
    );
};

export default Artists;

