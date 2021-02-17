import React from 'react'
import {getCharactersThunk, likeCharacterThunk} from "../../../redax/characters-reducer";
import {connect} from "react-redux";
import CharactersList from "./charactersList";


class CharactersAPI extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        if(this.props.characters.length === 0){
            this.props.getCharactersThunk();
        }
    }
    render() {
        return (
            <>
                <CharactersList likeCharacterThunk={this.props.likeCharacterThunk} isFetching={this.props.isFetching} characters={this.props.characters} />
            </>
        );
    }
}
let mapStateToProps = (state) =>{
    return{
        characters: state.characters.characters,
        isFetching: state.characters.isFetching
    }
}
const CharactersContainer = connect(mapStateToProps, {getCharactersThunk, likeCharacterThunk})
(CharactersAPI);

export default CharactersContainer;