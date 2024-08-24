import * as React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import BlankLayout from "../layouts/BlankLayout";
import GenreMoviesPage from "../pages/GenreMoviesPage";
import DetailPage from "../pages/DetailPage";
import DetailPageLayout from "../pages/DetailPageLayout";
import SearchResult from "../pages/SearchResult";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="genre/:genreId" element={<GenreMoviesPage />} >
          <Route path="detail/:id" element={<DetailPage />}/>
        </Route>
        <Route path="/search-flim/:searchInput" element={<SearchResult />} />
      </Route>

      <Route
        path="detail/:id"
        element={<DetailPageLayout />}
      >
        <Route index element={<DetailPage />} />
      </Route>
    
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;