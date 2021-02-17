import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from "react-redux";
import {setFaceBookLoginThunk} from "../../../redax/login-reducer";
import LinkedInLogin from "./LinkedIn/LinkedInLogin";
import {Redirect} from "react-router-dom";


class Login extends React.Component {
    responseFacebook = (response) => {
        this.props.setFaceBookLoginThunk(response)
    }
    render() {
        if(!this.props.isLogin){
            return (
                <div>
                    <h1>Login</h1>
                    <div className="container">
                        {!this.props.isLogin &&
                        <div>
                        <FacebookLogin
                            appId="848721775977517"
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile,user_friends"
                            callback={this.responseFacebook}
                            icon="fa-facebook"/>
                            <LinkedInLogin />
                        </div>
                        }
                    </div>
                </div>
            )
        }else{
            return <Redirect to={`/characters`} />
        }

    }
}

let mapStateToProps = (state) =>{
    return{
        isLogin: state.login.login,
        data: state.login.data,
        picture: state.login.picture
    }
}
const LoginContainer = connect(mapStateToProps, {setFaceBookLoginThunk})(Login);
export default LoginContainer;