import css from './MovieList.module.css'
import { NavLink } from "react-router-dom";

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <NavLink to={`/movies/${movie.id}`}>{movie.original_title}</NavLink>
        </li>
      ))}
    </ul>
  );
}