import React from 'react';

function Card({
    image, 
    title, 
    author, 
    description, 
    published
}){
    return (
        <div className="card">
            <img className="card-img-top" src="https://via.placeholder.com/400x500" style={{
                height: '400px',
                objectFit: 'cover'
            }}></img>
        
            <div className="card-body">
                <h1 className="card-title">
                    Judul Berita
                </h1>
                <h2 className="card-subtitle text-muted">
                    Nama Penulis
                </h2>
                <p className="card-text">
                Deskripsi Berita
                Deskripsi Berita
                Deskripsi Berita
                </p>
                <small className="text-muted">
                    12 Maret 2019

                </small>
            </div>
        </div>
    )
};

export default Card;