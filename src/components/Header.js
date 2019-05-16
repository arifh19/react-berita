import React from 'react';

function Header(props){
    return (
        <div className="p-3" style={{
            backgroundColor: '#76ff03'
        }}>
            <h2 style={{
                color: 'white',
                textAlign: 'center',
            }}>{props.title}</h2>
        </div>      
    )
};

export default Header;