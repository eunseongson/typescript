import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import PlayButton from '../../../common/components/PlayButton';
import { ITrack } from '../../../models/tracks';

interface ITopResultProps {
    track: ITrack;
}

const TopResultContainer = styled(Box)(({ theme }) => ({
    borderRadius: '8px',
    padding: '20px',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
        backgroundColor: (theme.palette.background as any).gray || theme.palette.action.hover,
        transition: 'all 0.3s ease-out',
        '& button': {
            opacity: 1,
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: '16px',
    },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
    width: '150px',
    height: '150px',
    marginBottom: '20px',
    img: {
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        objectFit: 'cover',
    },
    [theme.breakpoints.down('md')]: {
        width: '120px',
        height: '120px',
        marginBottom: '16px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100px',
        height: '100px',
        marginBottom: '12px',
    },
}));

const PlayButtonWrapper = styled(Box)({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    button: {
        opacity: 0,
        transition: 'all 0.3s ease-out',
    },
});

const TopResult: React.FC<ITopResultProps> = ({ track }) => {
    const imageUrl = track.album?.images?.[0]?.url || '';
    const artistName = track.artists?.[0]?.name || 'Unknown Artist';

    return (
        <TopResultContainer>
            <ImageContainer>
                {imageUrl && <img src={imageUrl} alt={track.name} />}
            </ImageContainer>
            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ 
                    mb: 1, 
                    color: 'text.primary',
                    fontSize: { xs: '18px', sm: '20px', md: '24px' }
                }}
            >
                {track.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Song • {artistName}
            </Typography>
            <PlayButtonWrapper>
                <PlayButton />
            </PlayButtonWrapper>
        </TopResultContainer>
    );
};

export default TopResult;

