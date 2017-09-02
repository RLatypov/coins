import { combineReducers } from 'redux';
import FireBaseUser from './firebase';
import dotProp from 'dot-prop-immutable';

import {
    GET_USER_DATA,
    SET_USER_DATA
} from '../actions/types';

function FireBaseUserData (state = null, action) {
    switch (action.type) {
    case GET_USER_DATA:
        return action.payload;
    case SET_USER_DATA:
        let newState;
        const [collections, collection, coinId, isChecked] = action.payload;
        if (isChecked === null) {
            newState = dotProp.delete(state, `${collections}.${collection}.${coinId}`);
        } else {
            newState = dotProp.set(state, `${collections}.${collection}.${coinId}`, isChecked);
        }
        return newState;
    default:
        return state;
    }
}

const rootReducer = combineReducers({
    currentUser: FireBaseUser,
    userData: FireBaseUserData
});

export default rootReducer;
