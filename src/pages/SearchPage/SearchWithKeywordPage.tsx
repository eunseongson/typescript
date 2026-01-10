import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, Typography, styled } from '@mui/material'
import { searchQuery, searchQueryData, searchDebounceQuery } from '../../atoms/search'
import { ISearchResponse } from '../../models/search'
import { SEARCH_TYPE } from '../../models/search'
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword'
import TopResult from './components/TopResult'
import Songs from './components/Songs'
import Artists from './components/Artists'
import Albums from './components/Albums'
import Loading from '../../common/components/Loading'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    [theme.breakpoints.down('sm')]: {
        gap: '16px',
    },
}))

const TopSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '24px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '16px',
    },
}))

const Section = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1,
})

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '24px',
    color: 'text.primary',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
    },
}))

const SearchWithKeywordPage = () => {
    const [, setQuery] = useRecoilState(searchQuery)
    const queryData = useRecoilValue(searchQueryData) as ISearchResponse
    const { keyword } = useParams()

    useEffect(() => {
        keyword && setQuery(keyword)
    }, [keyword, setQuery])

    // SearchInput에서 사용하는 debounceQuery를 가져와서 같은 queryKey 사용
    // React Query가 자동으로 캐싱하고 상태를 공유함
    const debounceQuery = useRecoilValue(searchDebounceQuery)
    const searchParams = useMemo(() => ({
        q: debounceQuery,
        type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album] as SEARCH_TYPE[],
    }), [debounceQuery])

    const { isLoading } = useSearchItemsByKeyword(searchParams)

    const tracks = (queryData?.tracks?.items || []).slice(0, 4)
    const artists = (queryData?.artists?.items || []).slice(0, 6)
    const albums = (queryData?.albums?.items || []).slice(0, 6)
    const topTrack = tracks[0]

    if (isLoading) {
        return (
            <Container>
                <Loading />
            </Container>
        )
    }

    if (!queryData || (!tracks.length && !artists.length && !albums.length)) {
        return null
    }

    return (
        <Container>
            {topTrack && (
                <TopSection>
                    <Section>
                        <SectionTitle>Top result</SectionTitle>
                        <TopResult track={topTrack} />
                    </Section>
                    <Section>
                        <SectionTitle>Songs</SectionTitle>
                        <Songs tracks={tracks} />
                    </Section>
                </TopSection>
            )}
            {artists.length > 0 && (
                <Section>
                    <SectionTitle>Artists</SectionTitle>
                    <Artists artists={artists} />
                </Section>
            )}
            {albums.length > 0 && (
                <Section>
                    <SectionTitle>Albums</SectionTitle>
                    <Albums albums={albums} />
                </Section>
            )}
        </Container>
    )
}

export default SearchWithKeywordPage