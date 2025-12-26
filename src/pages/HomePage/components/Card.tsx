import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'
import PlayButton from '../../../common/components/PlayButton'
import { transform } from 'typescript'

interface ICardProps {
    image: string
    name: string
    artistName: string | undefined
}

const CardLayout = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
})

const ImgContainer = styled('div')({
    position: 'relative',
    width: '100%',
    img: { width: '100%', height: '100%', borderRadius: '8px' },
    button: { opacity: 0 },
    '&:hover': {
        button: { opacity: 1 },
        transition: 'all 0.3s ease-out',
    },
})

const Card = ({ image, name, artistName = "unknown Artist" }: ICardProps) => {
    return (
        <CardLayout>
            <ImgContainer>
                <img src={image} alt="" />
                <PlayButton />
            </ImgContainer>
            <Typography>{name}</Typography>
            <Typography>{artistName}</Typography>
        </CardLayout>
    )
}

export default Card