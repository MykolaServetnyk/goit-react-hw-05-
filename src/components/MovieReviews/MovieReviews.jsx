import css from './MovieReviews.module.css';
import { FaUser } from "react-icons/fa";
import { getMoviesReviews } from '../../films-api';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


export default function MovieReviews() {

    const { movieId } = useParams();
    const [moviesReviews, setMoviesReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovieReviews() {
            setIsLoading(true);
            try {
                const data = await getMoviesReviews(movieId);
                setMoviesReviews(data.results);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchMovieReviews();
    }, [movieId]);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Please try again later...</p>}
            <ul className={css.reviewsList}>
                {moviesReviews.length > 0 ? moviesReviews.map(({id, author, content}) => {
                    return (
                        <li className={css.reviewItem} key={id}>
                            <p><FaUser /> {author}</p>
                            <p>Content:{ content}</p>
                        </li>
                    )
                }):<p>There are still no reviews for this movie</p>}

            </ul>
        </div>)
   
}