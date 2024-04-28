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

    const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Please try again later...</p>}
        <ul className={css.castList}>
                {moviesCast.length > 0 ?
                    moviesCast.map(({ credit_id, profile_path, original_name, character }) => {
                return (
                    <li key={credit_id}>
                        <img className={css.img} src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : defaultImg} alt={original_name} width={200} />
                        <h2 className={css.castTitle}><RiUserStarFill /> {original_name}</h2>
                        <p className={css.castChar}>"{character}"</p>
                    </li>
                );
            }): <p>No info provided</p>}
            </ul>
           
        </div>
    );
}
