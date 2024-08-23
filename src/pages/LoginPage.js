import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ctaOne from "../cta-logo-one.png"
import ctaTwo from "../cta-logo-two.png"
import { Button, TextField } from "@mui/material";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  function handleSubmit(event) {
    event.preventDefault();

    let from = location.state?.from?.pathname || "/";
    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  }

  return (
      <div style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h1 style={{color:"#fff", marginBottom:"20px",textAlign:"center"}}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="User name"
            variant="outlined"
            name="username"
            sx={{
              width: "100%",
              borderRadius: "5px",
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'transparent',  // Màu nền xanh
                color: '#fff',  // Màu chữ trắng
                '& fieldset': {
                  borderColor: '#fff',  // Viền màu xanh
                },
                '&:hover fieldset': {
                  borderColor: '#fff',  // Viền màu xanh đậm khi hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',  // Viền màu xanh đậm khi focus
                },
              },
              '& .MuiInputLabel-root': {
                color: '#fff',  // Màu chữ của label
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',  // Màu chữ của label khi focus
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#165298",
            fontWeight: "bold",
            ':hover': {
            backgroundColor: "#1A5CB7", // Màu nền khi hover
            },
            }}
          >
          Login
          </Button>
        </form>
        <div style={{display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"100px"}}>
          <img src={ctaOne} alt="cta-one" width="750px"></img>
          <p style={{color:"#fff", width:"550px", fontSize:"11px", textAlign:"center", margin:"15px 0 15px 0"}}>Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. As of 03/26/21, the price of Disney+ and The Disney Bundle will increase by $1.</p>
          <img src={ctaTwo} alt="cta-two" width="750px"></img>
        </div>
      </div>
          

  );
}

export default LoginPage;