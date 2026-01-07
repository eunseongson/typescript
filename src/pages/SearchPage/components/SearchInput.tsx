import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";

const SearchInput = () => {
  const [keyword, setKeyword] = React.useState("");
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    useSearchItemsByKeyword({
      q: keyword,
      type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
    });
  return (
    <div className="search">
      <input
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="What do you want to play?"
      ></input>
      <SearchIcon className="icon" />
    </div>
  );
};

export default SearchInput;
