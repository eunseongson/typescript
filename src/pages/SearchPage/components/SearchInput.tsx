import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import { useRecoilState } from "recoil";
import { searchQuery, searchQueryData, searchDebounceQuery } from "../../../atoms/search";
import { useNavigate } from "react-router";

const SearchInput = () => {
  const [query, setQuery] = useRecoilState(searchQuery)
  const [debounceQuery, setDebounceQuery] = useRecoilState(searchDebounceQuery)
  const [, setQueryData] = useRecoilState(searchQueryData)
  const navigate = useNavigate();
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value) {
      navigate(`/search/${value}`);
    } else {
      navigate('/search');
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query); // 0.2초 뒤에 API용 쿼리 업데이트
    }, 200);
    return () => clearTimeout(timer);
  }, [query, setDebounceQuery])

  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    useSearchItemsByKeyword({
      q: debounceQuery,
      type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    });

  useEffect(() => {
    if (data?.pages && data.pages.length > 0) {
      const searchResults = { ...data.pages[data.pages.length - 1] };
      setQueryData(searchResults);
    } else if (!data) {
      // data가 없을 때는 빈 객체로 초기화
      setQueryData({});
    }
  }, [data, setQueryData])
  return (
    <div className="search">
      <input
        value={query}
        onChange={handleSearchKeyword}
        placeholder="What do you want to play?"
      ></input>
      <SearchIcon className="icon" />
    </div>
  );
};

export default SearchInput;
