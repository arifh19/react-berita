import React from 'react';
import './BottomBar.css'


function getClassName (page, currentPage){
    if(page === currentPage){
        return "bottom-bar__item bottom-bar__item--active";
    }
    return "bottom-bar__item";
}
function BottomBar({changePage, currentPage}){
    return (
        <div className="bottom-bar">
            <p 
                onClick={()=>changePage('home')} className={getClassName('home', currentPage)}>
                Home
            </p>
            <p 
                onClick={()=>changePage('favorite')} className={getClassName('favorite', currentPage)}>
                Favorite
            </p>
        </div>
    );
}

export default BottomBar;