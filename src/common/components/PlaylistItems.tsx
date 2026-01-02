import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { ISimplifiedPlaylist } from "../../models/playlist";
import { useParams } from "react-router";
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface IPlaylistItemsProps extends ISimplifiedPlaylist {
  id: string;
  handleClick: (id: string) => void;
}

// 이미지가 없을 때 보여줄 아이콘 컨테이너
const EmptyImageBox = styled('div')({
  width: '60px',
  height: '60px',
  borderRadius: "8px",
  alignSelf: "center",
  backgroundColor: '#333', // 어두운 회색 배경
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const PlaylistItems = (props: IPlaylistItemsProps) => {
  const { id, name, images, owner } = props;
  const { id: nowId } = useParams<{ id: string }>()
  const ContentBox = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: "8px",
    borderRadius: "8px",
    gap: "16px",
    img: {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      alignSelf: "center",
    },
    cursor: "pointer",
    backgroundColor: nowId === id && theme.palette.action.active,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    }
  }));

  const AdditionalInfoStyle = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ".name": {
      fontSize: "16px",
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
    fontSize: "14px",
    color: "gray",
  }));
  return (
    <ContentBox onClick={() => props.handleClick(id)}>
      {
        !images ? (
          <EmptyImageBox>
            <MusicNoteIcon />
          </EmptyImageBox>
        ) :
          (<img src={images?.[0]?.url} alt={name} />)
      }

      <AdditionalInfoStyle key={id}>
        <div className="name">{name}</div>
        <div>playlist - {owner?.display_name}</div>
      </AdditionalInfoStyle>
    </ContentBox>
  );
};

export default PlaylistItems;
