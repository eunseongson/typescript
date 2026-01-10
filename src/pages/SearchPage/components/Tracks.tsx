import React from 'react';
import { Grid2, Typography, styled } from '@mui/material';
import PlayButton from '../../../common/components/PlayButton';
import { ITrack } from '../../../models/tracks';

interface ITracksProps {
    tracks: ITrack[];
}

const TrackImageContainer = styled('div')({
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

const TrackCardLayout = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
});

const Tracks: React.FC<ITracksProps> = ({ tracks }) => {
    if (!tracks || tracks.length === 0) return null;

    return (
        <Grid2 container spacing={2}>
            {tracks.map((track, index) => {
                const imageUrl = track.album?.images?.[1]?.url || track.album?.images?.[0]?.url || '';
                const artistNames = track.artists?.map(a => a.name).join(', ') || 'Unknown Artist';

                return (
                    <Grid2 size={{ xs: 6, sm: 4, md: 2 }} key={track.id || index}>
                        <TrackCardLayout>
                            <TrackImageContainer>
                                {imageUrl && <img src={imageUrl} alt={track.name} />}
                                <PlayButton />
                            </TrackImageContainer>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '14px' } }} noWrap>
                                {track.name}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '14px' } }} color="text.secondary" noWrap>
                                {artistNames}
                            </Typography>
                        </TrackCardLayout>
                    </Grid2>
                );
            })}
        </Grid2>
    );
};

export default Tracks;

