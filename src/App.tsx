import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Loading from './common/components/Loading';
const AppLayout = React.lazy(() => import("./layout/AppLayout"))
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"))
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"))
const SearchWithKeywordPage = React.lazy(() => import("./pages/SearchPage/SearchWithKeywordPage"))
const PlayListPage = React.lazy(() => import("./pages/PlayListPage/PlayListPage"))
const PlayListDetailPage = React.lazy(() => import("./pages/PlayListPage/PlaylistDetailPage"))

// 0. 사이드바 있어야함 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 검색페이지 /search
// 3. 검색목록 페이지 /search/:keyword
// 4. 플레이리스트 디테일 페이지 /playlist/:id
// 5. (모바일버전) 플레이리스트 보여주는 페이지
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlayListDetailPage />} />
          <Route path="playlist" element={<PlayListPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
