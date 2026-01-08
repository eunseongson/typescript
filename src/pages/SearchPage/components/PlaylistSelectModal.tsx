import React, { useEffect } from 'react';
import { Typography, Modal, styled } from '@mui/material';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlaylists';
import { ISimplifiedPlaylist } from '../../../models/playlist';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../common/components/Loading';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface IPlaylistSelectModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (playlistId: string) => void;
}

const ModalContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxHeight: '500px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
}));

const ModalTitle = styled(Typography)({
    fontWeight: 700,
    fontSize: '24px',
    marginBottom: '20px',
    color: 'text.primary',
});

const PlaylistList = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowY: 'auto',
    flex: 1,
    maxHeight: '400px',
});

const PlaylistItem = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const PlaylistImage = styled('div')({
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    overflow: 'hidden',
    flexShrink: 0,
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});

const EmptyImageBox = styled('div')(({ theme }) => ({
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    backgroundColor: (theme.palette.background as any).secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
}));

const PlaylistInfo = styled('div')({
    flex: 1,
    minWidth: 0,
});

const PlaylistName = styled(Typography)({
    color: 'text.primary',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const PlaylistOwner = styled(Typography)({
    color: 'text.secondary',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const PlaylistSelectModal: React.FC<IPlaylistSelectModalProps> = ({ open, onClose, onSelect }) => {
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetCurrentUserPlaylists({
        limit: 20,
        offset: 0,
    });

    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleSelect = (playlistId: string) => {
        onSelect(playlistId);
        onClose();
    };

    const allPlaylists: ISimplifiedPlaylist[] = data?.pages.flatMap(page => page.items) || [];

    return (
        <Modal open={open} onClose={onClose}>
            <ModalContainer>
                <ModalTitle>플레이리스트 선택</ModalTitle>
                {isLoading ? (
                    <Loading />
                ) : (
                    <PlaylistList>
                        {allPlaylists.map((playlist, index) => {
                            const isLastItem = index === allPlaylists.length - 10;
                            const imageUrl = playlist.images?.[0]?.url;

                            return (
                                <PlaylistItem
                                    key={playlist.id}
                                    ref={isLastItem ? ref : null}
                                    onClick={() => playlist.id && handleSelect(playlist.id)}
                                >
                                    {imageUrl ? (
                                        <PlaylistImage>
                                            <img src={imageUrl} alt={playlist.name} />
                                        </PlaylistImage>
                                    ) : (
                                        <EmptyImageBox>
                                            <MusicNoteIcon />
                                        </EmptyImageBox>
                                    )}
                                    <PlaylistInfo>
                                        <PlaylistName>{playlist.name}</PlaylistName>
                                        <PlaylistOwner>
                                            playlist • {playlist.owner?.display_name || 'Unknown'}
                                        </PlaylistOwner>
                                    </PlaylistInfo>
                                </PlaylistItem>
                            );
                        })}
                        {isFetchingNextPage && <Loading />}
                    </PlaylistList>
                )}
            </ModalContainer>
        </Modal>
    );
};

export default PlaylistSelectModal;

