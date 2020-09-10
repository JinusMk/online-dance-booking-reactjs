import {createStore, applyMiddleware} from 'redux'
import { saveStore } from './globalStore'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(){
    const store = createStore(rootReducer, {}, composeWithDevTools(
        applyMiddleware(thunk)
    ));
    saveStore(store);
    return store;
}
