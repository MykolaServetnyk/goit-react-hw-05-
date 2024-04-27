import css from './MovieCast.module.css';
import { RiUserStarFill } from "react-icons/ri";
import { getMoviesCast } from '../../films-api';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function MovieCast() {
    const { movieId } = useParams();
    const [moviesCast, setMoviesCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovieCast() {
            setIsLoading(true);
            try {
                const data = await getMoviesCast(movieId);
                setMoviesCast(data.cast);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchMovieCast();
    }, [movieId]);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Please try again later...</p>}
        <ul className={css.castList}>
            {moviesCast.length > 0 && moviesCast.map(({ credit_id, profile_path, original_name, character }) => {
                return (
                    <li key={credit_id}>
                        <img className={css.img} src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt={original_name} />
                        <h2 className={css.castTitle}><RiUserStarFill /> {original_name}</h2>
                        <p className={css.castChar}>"{character}"</p>
                    </li>
                );
            })}
            </ul>
           
        </div>
    );
}
