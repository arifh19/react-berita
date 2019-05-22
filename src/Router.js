import React from 'react';
import App from './pages/App';
import FavoritePage from './pages/FavoritePage';
import BottomBar from './components/BottomBar';

class Router extends React.Component{
    state = {
        currentPage: 'home',
    };

    changePage = (pageName)=>{
        this.setState({currentPage: pageName});
    }
    renderPage(){
        const {currentPage} = this.state;
        if(currentPage === 'home') return <App changePage={this.changePage}/>
        if(currentPage === 'favorite') return <FavoritePage changePage={this.changePage}/>
        return <p>Page Not found</p>;
       
    }
    render(){
        const {currentPage} =  this.state;
        return (
            <div>
                {this.renderPage()}
                <BottomBar currentPage={currentPage} changePage={this.changePage}/>
            </div>
        )
    }
}

export default Router;