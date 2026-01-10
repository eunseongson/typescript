import { Table, TableContainer, TextField, Typography, styled, Box } from '@mui/material'
import React, { useState } from 'react'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Loading from '../../../common/components/Loading';

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
}));

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>('');
    const { data, error, isLoading, hasNextPage, fetchNextPage } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track],
    })
    const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    if (error) return <ErrorMessage errorMessage={error.message} />
    return (
        <Container>
            <Typography variant='h1' my='10px' sx={{ fontSize: { xs: '20px', sm: '24px' } }}>
                Let's find somthing for your playlist!
            </Typography >
            <TextField 
                label="제목" 
                variant="filled" 
                value={keyword} 
                onChange={handleSearchKeyword} 
                sx={{ width: { xs: '100%', sm: '420px' } }}
                size="small"
            />
            {isLoading ? <Loading /> : data?.pages[0].tracks?.items.length === 0 ?
                <Typography variant='h6' my='20px' sx={{ fontSize: { xs: '14px', sm: '16px' } }}>
                    검색 결과가 없습니다. 다른 키워드로 검색해보세요.
                </Typography> :
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
                        {data?.pages.map((item, idx) => {
                            if (!item.tracks) return false;
                            const isLastPage = idx === data.pages.length - 1;
                            return (
                                <SearchResultList key={idx} list={item.tracks?.items} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} isLoading={isLoading} isLastPage={isLastPage} />
                            )
                        })}
                    </Table>
                </TableContainer>}
        </Container>
    )
}

export default EmptyPlaylistWithSearch