
import { Stack } from "@mui/material";
import Header from "../components/Header";

import DetailPage from "./DetailPage";


function DetailPageLayout() {
  return (
    <Stack sx={{ height:"100vh", display: 'flex', flexDirection: 'column' }}>
      <Header />

      <DetailPage />


    </Stack>
  );
}

export default DetailPageLayout;