import axios from "axios";

const TOKEN_API = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjQ4YTI2Y2JiYTc1MDg4YTIwNTY3ZDk1MDM5ZTUyYiIsInN1YiI6IjY2MjUwMTRiMmUyYjJjMDE0OTY1YTc5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NlXNL9ofisAknDUXPQLlGivQpe5PqyAzMoQF2K0RlyY';

const base_url = 'https://api.themoviedb.org/3';

const options = {
    headers: {
        Authorization: `Bearer ${TOKEN_API}`
    },
    language: 'en-US',
    include_adult: false
};

export const getTrendingMovies = async () => {
    const response = await axios.get(`${base_url}/trending/movie/day`, options);
    return response.data.results;
}

export const getMovieByTitle = async (query) => {
    const response = await axios.get(`${base_url}/search/movie`, {
        ...options,
        params: {
            query: query
        }
    });
    return response.data.results;
}

export const getMovieById = async (movieId) => {
    const response = await axios.get(`${base_url}/movie/${movieId}`, options);
    return response.data;
}

export const getMoviesCast = async (movieId) => {
    const response = await axios.get(`${base_url}/movie/${movieId}/credits`, options);
    return response.data;
}

export const getMoviesReviews = async (movieId) => {
    const response = await axios.get(`${base_url}/movie/${movieId}/reviews`, options);
    return response.data;
}
