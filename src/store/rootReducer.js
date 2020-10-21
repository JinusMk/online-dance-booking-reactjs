import { combineReducers } from 'redux';
import sharedReducers from '../shared_elements/reducer'
import homeReducer from '../features/home/reducer'

const rootReducer = combineReducers({
    sharedReducers,
    homeReducer
});
export default rootReducer
