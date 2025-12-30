import React from 'react'
import { styled } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const ContentBox = styled('div')({
    display: 'flex',
    backgroundColor: 'black',
    borderRadius: '8px',
    img: {
        padding: '20px',
        width: '200px',
        height: '200px',
        borderRadius: '30px'
    }
})

// 이미지가 없을 때 보여줄 아이콘 컨테이너
const EmptyImageBox = styled('div')({
    width: '180px',
    height: '180px',
    margin: '20px', // img의 padding 대신 margin 부여
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333', // 어두운 회색 배경
    borderRadius: '30px',
    color: 'white'
})

const RightContentBox = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    '& .title': {
        fontSize: '35px',
        fontWeight: 'bold' // (선택사항) 글씨가 커지면 두께도 조절하는 경우가 많습니다.
    },
    '& .additionalInfo': {
        display: 'flex',
    },
    '&.owner': {
        fontWeight: 'bold' // (선택사항) 글씨가 커지면 두께도 조절하는 경우가 많습니다.
    }
})
const PlaylistDetailHeader = (props: any) => {
    const { images, owner, name, tracks } = props
    console.log("props: ", props)
    const hasImage = images && images.length > 0 && images[0].url;
    return (
        <ContentBox>
            {hasImage ? (
                <img src={images[0].url} alt={name} />
            ) : (
                <EmptyImageBox>
                    <MusicNoteIcon sx={{ fontSize: '80px' }} />
                </EmptyImageBox>
            )}
            <RightContentBox>
                <div className='title'>{name}</div>
                <div className='additionalInfo'>
                    <div className='owner'>{owner.display_name} :</div>
                    <div className='tracks'>{tracks.items.length}songs</div>
                </div>
            </RightContentBox>
        </ContentBox >
    )
}

export default PlaylistDetailHeader