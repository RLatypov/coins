import FireBaseTools from '../components/Firebase';
import {
    LOGIN_WITH_PROVIDER_FIREBASE,
    REGISTER_FIREBASE_USER,
    LOGIN_FIREBASE_USER,
    FETCH_FIREBASE_USER,
    UPDATE_FIREBASE_USER,
    CHANGE_FIREBASE_USER_PASSWORD,
    FIREBASE_PASSWORD_RESET_EMAIL,
    LOGOUT_FIREBASE_USER,
    GET_DATABASE_REFERENCE,
    GET_USER_DATA,
    SET_USER_DATA,
    GET_DATA
} from './types';

export function loginWithProvider (provider) {
    const request = FireBaseTools.loginWithProvider(provider);
    return {
        type: LOGIN_WITH_PROVIDER_FIREBASE,
        payload: request
    };
}

export function registerUser (user) {
    const request = FireBaseTools.registerUser(user);
    return {
        type: REGISTER_FIREBASE_USER,
        payload: request
    };
}

export function loginUser (user) {
    const request = FireBaseTools.loginUser(user);
    return {
        type: LOGIN_FIREBASE_USER,
        payload: request
    };
}

export function fetchUser () {
    const request = FireBaseTools.fetchUser();
    return {
        type: FETCH_FIREBASE_USER,
        payload: request
    };
}

export function updateUser (user) {
    const request = FireBaseTools.updateUserProfile(user);
    return {
        type: UPDATE_FIREBASE_USER,
        payload: request
    };
}

export function changePassword (newPassword) {
    const request = FireBaseTools.changePassword(newPassword);
    return {
        type: CHANGE_FIREBASE_USER_PASSWORD,
        payload: request
    };
}

export function resetPasswordEmail (email) {
    const request = FireBaseTools.resetPasswordEmail(email);
    return {
        type: FIREBASE_PASSWORD_RESET_EMAIL,
        payload: request
    };
}

export function logoutUser (user) {
    const request = FireBaseTools.logoutUser(user);
    return {
        type: LOGOUT_FIREBASE_USER,
        payload: request
    };
}

export function getDatabaseReference (path) {
    const request = FireBaseTools.getDatabaseReference(path);
    return {
        type: GET_DATABASE_REFERENCE,
        payload: request
    };
}

export function getUserData (user) {
    const request = FireBaseTools.getUserData(user);
    return {
        type: GET_USER_DATA,
        payload: request
    };
}

export function setUserData (user, collections, collection, coinId, isChecked) {
    const request = FireBaseTools.setUserData(user, collections, collection, coinId, isChecked);
    return {
        type: SET_USER_DATA,
        payload: request
    };
}

export function getData (url) {
    const request = fetch(url).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    }).catch((err) => console.log('Fetch Error :-S', err));

    return {
        type: GET_DATA,
        payload: request
    };
}
