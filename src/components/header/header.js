import React from 'react'
import {NavLink} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const AppHeader = (props) => {
    return (
            <AppBar position="static">
                <Toolbar>
                    <div></div>
                    <NavLink to="/characters">
                        <Typography variant="h6">
                            Characters
                        </Typography>
                    </NavLink>
                    <Typography variant="h6">
                        <NavLink to="/liked">Liked Items   </NavLink>
                    </Typography>
                    {
                        props.login.login &&
                        <Button color="inherit">
                            {props.login.data.name}
                        </Button>
                    }
                    {
                        !props.login.login &&
                        <Button color="inherit">
                            <NavLink to="/home">Login</NavLink>
                        </Button>
                    }
                </Toolbar>
            </AppBar>
    )
}


export default AppHeader