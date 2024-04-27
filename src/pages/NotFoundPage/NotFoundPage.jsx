import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    
    return (
        <div>
      <p>Opps! Page not found! Sorry!</p>
      <p>
        Please visit our <Link to="/">home page</Link>
      </p>
    </div>
    )
}