import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import {userContext} from '../../App'
import { useHistory, useLocation } from 'react-router';
import './Login.css'
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // var credential = result.credential;
                // var token = credential.accessToken;
                var user = result.user;
                //console.log(user)
                const {displayName, email} = user;
                const signedInUser = {name: displayName, email};
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log('signedInUser: ',signedInUser);
                // console.log('loggedInUser: ',loggedInUser)
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="login">
            <h1>This is log in</h1>
            <button className="btnStyle" onClick={handleGoogleSignIn}><i class="fab fa-google icon"></i>Google Sign In</button>
        </div>
    );
};

export default Login;