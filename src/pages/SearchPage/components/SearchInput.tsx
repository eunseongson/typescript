import React, { useEffect } from "react";
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
    const nextURL = value ? `/search/${encodeURIComponent(value)}` : '/search';
    window.history.replaceState(null, '', nextURL);
    if (!value) {
      navigate(`/search`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // debounceQuery를 즉시 업데이트하여 쿼리 실행
      setDebounceQuery(query);
      // 또는 refetch를 사용하여 현재 쿼리 다시 실행
      if (debounceQuery) {
        navigate(`/search/${debounceQuery}`);
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query); // 0.2초 뒤에 API용 쿼리 업데이트
    }, 200);
    return () => clearTimeout(timer);
  }, [query, setDebounceQuery, navigate])

  useEffect(() => {
    return () => {
      setDebounceQuery('');
      setQuery('');
    }
  }, [setDebounceQuery, setQuery])

  const { data, error, isLoading, hasNextPage, fetchNextPage, refetch } =
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
        onKeyDown={handleKeyDown}
        placeholder="What do you want to play?"
      ></input>
      <SearchIcon className="icon" />
    </div>
  );
};

export default SearchInput;
