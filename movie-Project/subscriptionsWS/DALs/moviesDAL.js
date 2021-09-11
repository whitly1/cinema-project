const axios = require('axios');
const getMovies = async () => {
  let resp = await axios.get("https://api.tvmaze.com/shows")
  let oldMovies = resp.data;
  return (oldMovies);
};
module.exports = { getMovies }