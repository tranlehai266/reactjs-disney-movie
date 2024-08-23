import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../login-background.jpg";
import { Stack } from "@mui/material";

const HeaderStyle = styled("header")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${Logo})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",

}));

function BlankLayout() {
  return (
    <Stack sx={{ height:"100%", justifyContent: "center", alignItems: "center" }}>
      <HeaderStyle>
        <Outlet />
      </HeaderStyle>
    </Stack>
  );
}

export default BlankLayout;
