import react from 'react';
import { Link } from 'react-router-dom';

const blogItem = props => {
    const {
        id,
        blog_status,
        content,
        title,
        featured_image_url
    } = props.blogItem;

    return (
        <div>
            <Link to={`/b/${id}`}>
                <h1>{title}</h1>
            </Link>
            <div>{content}</div>
        </div>
    );
};

export default blogItem;