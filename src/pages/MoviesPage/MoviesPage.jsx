import { useState } from 'react';
import { getMovieByTitle } from '../../films-api';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const searchedMovies = await getMovieByTitle(searchQuery);
            if (searchQuery === '') {
                toast.error("Please, enter your request!");
            }
            setMovies(searchedMovies);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div><Toaster/></div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className={css.btn} type='submit'>Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}
