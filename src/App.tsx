import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Loading from "./common/components/Loading";
import { useExchangetToken } from "./hooks/useExchangetToken";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
  () => import("./pages/SearchPage/SearchWithKeywordPage")
);
const PlayListDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);
const LibraryPage = React.lazy(() => import("./pages/LibraryPage/LibraryPage"));
const PlayListPage = React.lazy(() => import("./pages/PlayListPage/PlayListPage"));

// 0. 사이드바 있어야함 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 검색페이지 /search
// 3. 검색목록 페이지 /search/:keyword
// 4. 플레이리스트 디테일 페이지 /playlist/:id
// 5. (모바일버전) 플레이리스트 보여주는 페이지
function App() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangetToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
      navigate("/");
    }
  }, [code, codeVerifier, exchangeToken, navigate]);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="callback" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="playlists" element={<PlayListPage />} />
          <Route path="playlist/:id" element={<PlayListDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
