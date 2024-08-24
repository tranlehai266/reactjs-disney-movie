import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3/";
const api_key = '0388ea5c37be1a573dcd3a5402d2f74e';

const getTrendingVideos = () => axios.get(`${movieBaseUrl}trending/all/day?api_key=${api_key}`);
const getListVideos = () => axios.get(`${movieBaseUrl}genre/movie/list?api_key=${api_key}`);
const getMovies = (id, page = 1) => axios.get(`${movieBaseUrl}discover/movie?api_key=${api_key}&with_genres=${id}&page=${page}`);
const getMovieDetails = (id) => axios.get(`${movieBaseUrl}movie/${id}?api_key=${api_key}`);
const getAllMovies = () => axios.get(`${movieBaseUrl}discover/movie?api_key=${api_key}`);
const getSearchMovies = (query) => axios.get(`${movieBaseUrl}search/movie?query=${query}&api_key=${api_key}`)


const GlobalApi = {
  getTrendingVideos,
  getListVideos,
  getMovies,
  getMovieDetails,
  getAllMovies,
  getSearchMovies
};

export default GlobalApi;
