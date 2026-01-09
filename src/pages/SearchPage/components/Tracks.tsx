import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import PlayButton from '../../../common/components/PlayButton';
import { ITrack } from '../../../models/tracks';

interface ITracksProps {
    tracks: ITrack[];
}

const TracksContainer = styled(Box)({
    display: 'flex',
    gap: '16px',
    width: '100%',
});

const TrackCard = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    cursor: 'pointer',
    flex: '1 1 0',
    minWidth: 0,
    maxWidth: 'calc((100% - 80px) / 6)',
});

const TrackImageContainer = styled(Box)({
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

const TrackTitle = styled(Typography)({
    color: 'text.primary',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const Tracks: React.FC<ITracksProps> = ({ tracks }) => {
    if (!tracks || tracks.length === 0) return null;

    return (
        <TracksContainer>
            {tracks.map((track, index) => {
                const imageUrl = track.album?.images?.[1]?.url || track.album?.images?.[0]?.url || '';
                const artistNames = track.artists?.map(a => a.name).join(', ') || 'Unknown Artist';

                return (
                    <TrackCard key={track.id || index}>
                        <TrackImageContainer>
                            {imageUrl && <img src={imageUrl} alt={track.name} />}
                            <PlayButton />
                        </TrackImageContainer>
                        <div>
                            <TrackTitle variant="body2">{track.name}</TrackTitle>
                            <Typography variant="body2" color="text.secondary">
                                {artistNames}
                            </Typography>
                        </div>
                    </TrackCard>
                );
            })}
        </TracksContainer>
    );
};

export default Tracks;

