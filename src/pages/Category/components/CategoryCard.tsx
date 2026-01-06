import React from 'react'
import { ICategory } from '../../../models/category'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import styled from '@emotion/styled'

// 랜덤 색상 팔레트
const colorPalette = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80',
  '#EC7063', '#5DADE2', '#F4D03F', '#82E0AA', '#F1948A',
  '#85C1E9', '#F7DC6F', '#D7BDE2', '#AED6F1', '#A9DFBF'
]

// ID를 기반으로 일관된 색상 선택
const getColorFromId = (id: string): string => {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colorPalette[Math.abs(hash) % colorPalette.length]
}

const CardBox = styled(Card)<{ bgColor: string }>(({ bgColor }) => ({
  width: '26vw',
  height: '300px',
  backgroundColor: bgColor,
  img: {
    marginLeft: 'auto',
    marginRight: '20px',
    width: '200px',
    height: '200px',
    borderRadius: '10px',
  },
  cursor: 'pointer',
  ":hover":{
    transform: 'scale(1.02)',
    transition: 'transform 0.4s ease-in-out',
  }
}))

const CategoryCard = (props: ICategory) => {
  const bgColor = getColorFromId(props.id)
  
  return (
    <CardBox bgColor={bgColor}>
      <CardContent>
        <Typography variant="h6" fontWeight={1000}>{props.name}</Typography>
      </CardContent>
      <CardMedia component="img" src={props.icons[0].url} alt={props.name} sx={{width: '200px', height: '200px'}}/>
    </CardBox>
  )
}

export default CategoryCard