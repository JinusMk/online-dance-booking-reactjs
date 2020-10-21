import * as actions from './actions'

export default function(state = { danceForms: ''}, action){
    switch(action.type){
        case actions.UPDATE_DANCEFORMS : 
            return {
                ...state,
                danceForms: action.payload
            }
        default:
            return state
    }
}