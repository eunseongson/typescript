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
    },
    '@media (max-width: 600px)': {
        flexDirection: 'column',
        img: {
            width: '100%',
            height: 'auto',
            padding: '16px',
            borderRadius: '0',
        },
    },
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
        fontWeight: 'bold'
    },
    '& .additionalInfo': {
        display: 'flex',
    },
    '&.owner': {
        fontWeight: 'bold'
    },
    '@media (max-width: 600px)': {
        padding: '16px',
        '& .title': {
            fontSize: '24px',
        },
        '& .additionalInfo': {
            flexWrap: 'wrap',
            gap: '8px',
        },
    },
})
const PlaylistDetailHeader = (props: any) => {
    const { images, owner, name, tracks } = props
    const hasImage = images && images.length > 0 && images[0].url;
    return (
        <div>
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

        </div>
    )
}

export default PlaylistDetailHeader