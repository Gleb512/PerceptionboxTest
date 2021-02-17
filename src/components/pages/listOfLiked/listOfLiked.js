import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class ListOfLiked extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.liked.length>0 ?
                    this.props.liked.map(item => <p><NavLink key={item.name} to={item.name}>{item.name}</NavLink></p>)
                    : 'There are no liked characters yet'}
            </div>
        );
    }
}

let mapStateToProps = (state) =>{
    return{
        liked: state.characters.liked,
    }
}
const ListOfLikedContainer = connect(mapStateToProps, {})
(ListOfLiked);
export default ListOfLikedContainer