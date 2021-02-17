import React from "react";
import {connect} from "react-redux";
import {getProfileThunk} from "../../../redax/characters-reducer";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";
import axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


class ProfileAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeworld: null,
            vehicles: [],
            films: [],
        }
    }
    getData = async () => {
        await this.props.getProfileThunk(this.props.match.params.name)
        if(this.props.profile){
            var th = this;
            if(this.props.profile.homeworld){
                const homeworld = axios.get(this.props.profile.homeworld)
                    .then(function (result) {
                        th.setState({
                            ...th.state,
                            homeworld: result.data.name
                        });
                    })
            }
            if(this.props.profile.vehicles && this.props.profile.vehicles.length > 0){
                const vehicles = this.props.profile.vehicles.map(vehicle => axios.get(vehicle)
                    .then(function (result) {
                        const newItem = result.data
                        th.setState({
                            ...th.state,
                            vehicles: [
                                ...th.state.vehicles, newItem
                            ]
                        });
                    }))
            }
            if(this.props.profile.films){
                const films = this.props.profile.films.map(film  => axios.get(film)
                    .then(function(result) {
                        const newItem = result.data
                        th.setState({
                            ...th.state,
                            films: [
                                ...th.state.films, newItem
                            ]
                        });
                    }))
            }
        }
    }
    componentDidMount() {
        this.getData()
    }




    render() {
        if(!this.props.match.params.name){
            return <Redirect to={`/characters`} />
        }else{
            if(!this.props.profile){
                return (<h1>Loading...</h1>)
            }else{
                return (
                    <div>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Profile:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Height:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.height}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Mass:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.mass}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Hair Color:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.hair_color}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Skin Color:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.skin_color}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Eye Color:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.eye_color}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Birth Year:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.birth_year}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Gender:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.props.profile.gender}
                                        </TableCell>
                                    </TableRow>
                                    {this.state.homeworld !== null &&
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Homeworld:
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.homeworld}
                                        </TableCell>
                                    </TableRow>
                                    }
                                    {
                                        this.state.vehicles.length > 0 &&
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Vehicles:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {this.state.vehicles.map(v =>
                                                    <div key={v.created}>
                                                        <p>
                                                            Name: <strong>{v.name}</strong>
                                                        </p>
                                                        <p>
                                                            Model: <strong>{v.model}</strong>
                                                        </p>
                                                        <hr/>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    }

                                    {
                                        this.state.films.length > 0 &&
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Films:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {this.state.films.map(film =>
                                                    <div key={film.created}>
                                                        <p>
                                                            <strong>{film.title}</strong>
                                                        </p>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                );
            }
        }
    }
}


let mapStateToProps = (state) =>{
    return{
        profile: state.characters.profile,
    }
}
const ProfileContainer = compose(connect(mapStateToProps, {getProfileThunk}), withRouter)(ProfileAPI);

export default ProfileContainer;