const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2MzNTAzM2VlNzJlZjNiYjI2MjA4NzY4OGJkODM5ZiIsInN1YiI6IjY1NjhlY2FlNzdjMDFmMDEyYzM5YjZmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FjfKmBSBk43rsuewvVWuCaDY_11bN22u373JpBi4G5k';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
          },
        });
        return response.data.results;
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
      }
    };