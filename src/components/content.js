import React from 'react'
import {Route, Switch} from "react-router-dom";
import Characters from "./pages/characters/characters";
import Profile from "./pages/characterProfile/profile";
import LoginContainer from "./pages/Login/login";
import ListOfLikedContainer from "./pages/listOfLiked/listOfLiked";




let Content = () => {
    return (
        <div>
            <Switch>
                <Route path='/characters' render={() => <Characters />  } />
                <Route path='/liked' render={() => <ListOfLikedContainer />  } />
                <Route path='/profile/:name?' render={() => <Profile />  } />
                {/*<Route exact path='/linkedin' render={() => <LinkedInPopUp />  } />*/}
                <Route path='/' render={() => <LoginContainer />  } />
            </Switch>
        </div>
    );
}

export default Content;