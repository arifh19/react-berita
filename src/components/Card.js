import React from 'react';
import moment from 'moment';
import HeartIcon from './HeartIcon'
import 'moment/locale/id';

function Card({
    image, 
    title, 
    author, 
    description, 
    published,
    url,
    onFavorite,
    isFavorite,
}){
    return (
            <div className="card mt-5 card-berita">
                <img className="card-img-top" src={image} alt="Contoh" style={{
                    height: '400px',
                    objectFit: 'cover'
                }}></img>
            
                <div className="card-body">
                    <a href={url} style={{textDecoration: "none", color:"inherit" }}>
                        <h1 className="card-title">
                            {title}
                        </h1>
                    </a>
                    <h2 className="card-subtitle text-muted">
                        {author}
                    </h2>
                    <p className="card-text">
                    {description}
                    </p>
                    <small className="text-muted">
                        {moment(published).fromNow()}
                    </small>
                    <HeartIcon isFavorite={isFavorite} onFavorite={onFavorite}></HeartIcon>
                </div>
            </div>
 
    )
};

export default Card;