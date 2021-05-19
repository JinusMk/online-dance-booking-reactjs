import { combineReducers } from 'redux';
import sharedReducers from '../shared_elements/reducer'
import homeReducer from '../features/home/reducer'
import scheduleReducer from '../features/schedule/reducer'

const rootReducer = combineReducers({
    sharedReducers,
    homeReducer,
    scheduleReducer
});
export default rootReducer
