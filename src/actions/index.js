import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {

    return function (dispatch) {  //redux-thunkin vuoksi palautetaan functio objectin(actionin) tilasta
        //Submit email/password to the server
        //axios.post(ROOT_URL + '/signin', { email: email, password: password })
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => { //Serveri lähettää responsen
                //       console.log(response);
                //If request is good...
                //-Update state to indicate user is authenticated    
                dispatch({ type: AUTH_USER });
                //- Save the JWT token
                localStorage.setItem('token', response.data.token); // ei tarvitse erikseen importata
                // selaimeen localStorage.getItem('token'), niin nayttaa tokenin

                //- redirect to the route '/feature'
                browserHistory.push('/feature'); //Ohjaraan toiselle sivulle

            })
            .catch(() => {
                //If request is bad...
                //- show an error to the user
                dispatch(authError('Bad login info')); //vaatii redux thunkin
            });
    }

}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {

    localStorage.removeItem('token');

    return {
        type: UNAUTH_USER
    }
}