import { combineReducers } from 'redux';
import words from './words';
import review from './review';

export default combineReducers({
    words,
    review
});