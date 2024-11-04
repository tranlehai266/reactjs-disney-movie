import React, { useEffect, useState, useCallback } from "react";
import GlobalApi from "../app/GlobalApi";
import { useParams } from "react-router-dom";
import { Box, Chip, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function DetailPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const detailResponse = useCallback(async () => {
    try {
      const response = await GlobalApi.getMovieDetails(id);
      console.log(response.data);
      setMovieDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    detailResponse();
  }, [detailResponse]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "auto", sm: "100vh" },
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
        alt={movieDetails.title}
        sx={{
          width: "100%",
          height: { xs: "300px", sm: "100%" },
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          position: { xs: "static", sm: "absolute" },
          top: { sm: "32%" },
          left: { sm: "5%" },
          padding: { xs: 2, sm: 0 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            textAlign: "center",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontFamily: "monospace",
            cursor: "pointer",
            display: "flex",
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background-color 0.3s ease",
          }}
        >
          <PlayArrowIcon />
          Play
        </button>
        <button
          style={{
            padding: "10px 20px",
            textAlign: "center",
            backgroundColor: "transparent",
            color: "#fff",
            border: "2px solid #fff",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background-color 0.3s ease",
            fontFamily: "monospace",
          }}
        >
          <PlayArrowIcon />
          Trailer
        </button>
      </Box>

      <Box
        sx={{
          position: { xs: "static", sm: "absolute" },
          top: { sm: "40%" },
          left: { sm: "5%" },
          padding: { xs: 2, sm: 0 },
          backgroundColor: { xs: "transparent", sm: "transparent" },
        }}
      >
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}
        >
          {movieDetails.genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              sx={{
                color: "#fff",
                backgroundColor: "#676D77",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "monospace",
            width: { xs: "100%", sm: "400px", md: "600px" },
          }}
        >
          {movieDetails.overview}
        </Typography>
      </Box>
    </Box>
  );
}

export default DetailPage;
