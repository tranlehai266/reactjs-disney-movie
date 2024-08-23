import { Outlet, useLocation } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import Header from "../components/Header";
import SlidePage from "../pages/SlidePage";
import CardPage from "../pages/CardPage";
import MovieList from "../pages/MovieList";

function MainLayout() {
  const location = useLocation();
  
  // Kiểm tra nếu đường dẫn hiện tại không phải là đường dẫn gốc ("/") thì không hiển thị MovieList
  const showMovieList = location.pathname === "/";

  return (
    <Stack sx={{ minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
      <Header />

      <SlidePage />
      <CardPage />

      {/* Hiển thị MovieList chỉ trên đường dẫn gốc */}
      {showMovieList && <MovieList  />}

      <Box sx={{ flexGrow: 1 }} />
      <Outlet />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
