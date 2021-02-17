import React, {useState} from 'react'
import {Redirect} from "react-router-dom";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import CharacterItem from "./characterItem";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";

const CharactersList = (props) => {
    const [profile, setNewProfile] = useState(false);
    const handleOnSelect = (item) => {
        let ProfileLink = item.name.replace(/\s+/g, '');
        setNewProfile(ProfileLink)
    }
    if(profile){
        return <Redirect to={`/profile/${profile}`} />
    }else{
        return (
            <div>
                <h1>Characters</h1>
                { props.isFetching ? <h1>Loading...</h1>
                    :
                    <div>
                        <ReactSearchAutocomplete
                            items={props.characters}
                            onSelect={handleOnSelect}
                        />
                        <TableContainer>
                            <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Homeworld</TableCell>
                                    <TableCell>Add to liked list</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.characters.map(c => <CharacterItem likeCharacterThunk={props.likeCharacterThunk} key={c.created} character={c} />)}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>}
            </div>
        );
    }
}

export default CharactersList