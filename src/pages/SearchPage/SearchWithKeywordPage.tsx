import React from 'react'
import { useParams } from 'react-router'

const SearchWithKeywordPage = () => {
    const { keyword } = useParams()
    return (
        <div>검색 키워드 : {keyword}</div>
    )
}

export default SearchWithKeywordPage