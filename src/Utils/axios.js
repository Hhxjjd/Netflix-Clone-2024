// axios.js

import axios from "../Utils/axios.js";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;