import React, { forwardRef } from 'react'
import { IPlaylistTrack } from '../../../models/playlist';
import { styled, TableCell, TableRow } from '@mui/material';
import { IEpisode, ITrack } from '../../../models/tracks';
import { durationMsToTimeString, formatDateString } from '../../../utils/common';

interface IDesktopPlaylistItemProps {
    index: number;
    item: IPlaylistTrack
}

const TableRowStyle = styled(TableRow)(({ theme }) => ({
    // 하단 테두리 제거
    '& .MuiTableCell-root': {
        borderBottom: 'none',
    },
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover,
    },
}));

const DesktopPlaylistItem = forwardRef<HTMLTableRowElement, IDesktopPlaylistItemProps>(({ index, item }, ref) => {
    const isEpisode = (track: ITrack | IEpisode): track is IEpisode => {
        return "description" in track;
    }
    return (
        <TableRowStyle ref={ref}>
            <TableCell 
                sx={{ 
                    display: { xs: 'none', sm: 'table-cell' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '12px 8px',
                }}
            >
                {index}
            </TableCell>
            <TableCell 
                sx={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    padding: '12px 8px',
                }}
            >
                {item.track.name || "no Name"}
            </TableCell>
            <TableCell 
                sx={{ 
                    display: { xs: 'none', sm: 'table-cell' }, 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    padding: '12px 8px',
                }}
            >
                {isEpisode(item.track) ? "N/A" : item.track.album?.name}
            </TableCell>
            <TableCell 
                sx={{ 
                    display: { xs: 'none', sm: 'table-cell' }, 
                    whiteSpace: 'nowrap',
                    padding: '12px 8px',
                }}
            >
                {item.added_at ? formatDateString(item.added_at) : "Unknown"}
            </TableCell>
            <TableCell 
                sx={{ 
                    whiteSpace: 'nowrap',
                    padding: '12px 8px',
                }}
            >
                {item.track.duration_ms ? durationMsToTimeString(item.track.duration_ms) : "Unknown"}
            </TableCell>
        </TableRowStyle>
    )
});

export default DesktopPlaylistItem