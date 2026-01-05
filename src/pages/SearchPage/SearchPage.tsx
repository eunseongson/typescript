import { Box, styled, Typography } from '@mui/material'
import React from 'react'

const ContentBox = styled(Box)({
    marginTop: '20px',
})

const SearchPage = () => {
    return (
        <ContentBox>
            <Typography variant='h1'>Browse all</Typography>

        </ContentBox>
    )
}

export default SearchPage