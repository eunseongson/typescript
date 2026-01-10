import React, { useState } from 'react';
import { Box, Typography, styled, IconButton, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ITrack } from '../../../models/tracks';
import PlaylistSelectModal from './PlaylistSelectModal';
import useAddItemsToPlaylist from '../../../hooks/useAddItemsToPlaylist';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../../utils/auth';

interface ISongsProps {
    tracks: ITrack[];
}

const SongsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
});

const SongItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        gap: '12px',
        padding: '6px',
    },
    '& button': {
        opacity: 0,
        transition: 'all 0.2s ease-out',
    },
    '&:hover': {
        backgroundColor: (theme.palette.background as any).gray || theme.palette.action.hover,
        transition: 'all 0.2s ease-out',
        '& button': {
            opacity: 1,
        },
    },
}));

const SongImage = styled('img')(({ theme }) => ({
    width: '56px',
    height: '56px',
    borderRadius: '4px',
    objectFit: 'cover',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
        width: '48px',
        height: '48px',
    },
}));

const SongInfo = styled(Box)({
    flex: '1 1 0',
    minWidth: 0,
    maxWidth: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
});

const SongTitle = styled(Typography)({
    color: 'text.primary',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    width: '60%',
});

const AddButton = styled(IconButton)(({ theme }) => ({
    width: '18px',
    height: '18px',
    padding: 0,
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: '50%',
    color: theme.palette.text.secondary,
    flexShrink: 0,
    '&:hover': {
        borderColor: theme.palette.text.primary,
        color: theme.palette.text.primary,
        backgroundColor: 'transparent',
    },
}));

const SongArtist = styled(Typography)({
    color: 'text.secondary',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    width: '100%',
    maxWidth: '100%',
});

const SongDuration = styled(Typography)({
    color: 'text.secondary',
    fontSize: '14px',
    minWidth: '50px',
    textAlign: 'right',
    flexShrink: 0,
});

const formatDuration = (ms: number | undefined): string => {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const Songs: React.FC<ISongsProps> = ({ tracks }) => {
    const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { mutate: addItemsToPlaylist } = useAddItemsToPlaylist();
    const { data: user } = useGetCurrentUserProfile();

    if (!tracks || tracks.length === 0) return null;

    const handleAddClick = (e: React.MouseEvent, track: ITrack) => {
        e.stopPropagation();
        if (!user) {
            getSpotifyAuthUrl();
            return;
        }
        setSelectedTrack(track);
        setModalOpen(true);
    };

    const handlePlaylistSelect = (playlistId: string) => {
        if (!selectedTrack?.uri) return;

        addItemsToPlaylist(
            {
                playlist_id: playlistId,
                positions: 0,
                uris: selectedTrack.uri,
            },
            {
                onSuccess: () => {
                    setSnackbarOpen(true);
                },
            }
        );
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <SongsContainer>
                {tracks.map((track, index) => {
                    const imageUrl = track.album?.images?.[2]?.url || track.album?.images?.[1]?.url || track.album?.images?.[0]?.url || '';
                    const artistNames = track.artists?.map(a => a.name).join(', ') || 'Unknown Artist';

                    return (
                        <SongItem key={track.id || index}>
                            <SongImage src={imageUrl} alt={track.name} />
                            <SongInfo>
                                <SongTitle variant="body1" noWrap>{track.name}</SongTitle>
                                <SongArtist noWrap>{artistNames}</SongArtist>
                            </SongInfo>
                            <AddButton
                                size="small"
                                onClick={(e) => handleAddClick(e, track)}
                            >
                                <AddIcon fontSize="small" />
                            </AddButton>
                            <SongDuration>{formatDuration(track.duration_ms)}</SongDuration>
                        </SongItem>
                    );
                })}
            </SongsContainer>
            <PlaylistSelectModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={handlePlaylistSelect}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Added to Playlist
                </Alert>
            </Snackbar>
        </>
    );
};

export default Songs;

