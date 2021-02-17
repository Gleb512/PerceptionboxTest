import React from 'react'
import * as s from "./characters.module.css"
import axios from "axios";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


class CharacterItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            homeworld: null,
        }
    }
    componentDidMount() {
        if(this.props.character){
            var th = this;
            this.serverRequest =
                axios.get(this.props.character.homeworld)
                    .then(function(result) {
                        th.setState({
                            homeworld: result.data.name
                        });
                    })
        }
    }
    handleClick() {
        this.props.likeCharacterThunk(this.props.character.name)
    }
    render() {
        let ProfileLink = this.props.character.name.replace(/\s+/g, '');
        return (
                <TableRow>
                    <TableCell component="th" scope="row">
                        <NavLink to={`profile/${ProfileLink}`}>
                            {this.props.character.name}
                        </NavLink>
                    </TableCell>
                    <TableCell>{this.props.character.gender}</TableCell>
                    {this.state.homeworld !== null && <TableCell>{this.state.homeworld}</TableCell>}
                    <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => this.handleClick()}>Like</Button>
                    </TableCell>
                </TableRow>
        );
    }
}


export default CharacterItem;