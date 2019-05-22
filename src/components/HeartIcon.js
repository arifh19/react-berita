
import React from 'react';

class HeartIcon extends React.Component{
    state = {
        isMouseEnter : false,
        isClicked : false,
    }
    onMouseEnter(){
        this.setState({
            isMouseEnter: true,
        });
    }
    onMouseLeave(){
        this.setState({
            isMouseEnter: false,
        });
    }
    onClick(){
        this.setState({
            isClicked :true,
        }, ()=>{
            setTimeout(()=>{
                this.setState({isClicked: false})
            }, 700);
            this.props.onFavorite();
        });
    }
    getIconType(){
        const {isFavorite} = this.props; 
        const {isMouseEnter} = this.state;
        if(isFavorite && isMouseEnter){
            return "far";
        }
        if(isFavorite && !isMouseEnter){
            return "fas";
        }
        if(!isFavorite && isMouseEnter){
            return "fas";
        }
        if(!isFavorite && !isMouseEnter){
            return "far";
        }
    }

    render(){
        const {isClicked} = this.state;
        const type = this.getIconType();
        const heartScale =  isClicked ? 1.5 : 1;
        return(
            <div style={{
                textAlign: "center",

            }}>
                <i onMouseEnter={()=> this.onMouseEnter()} 
                    onMouseLeave={()=>this.onMouseLeave()}
                    onClick={()=>this.onClick()} 
                    style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    transition: ".5s all",
                    color: "#ef5350",
                    transform: `scale(${heartScale})`,
                }} class={`${type} fa-heart`}></i>
            </div>

        )
    }
}
export default HeartIcon;
