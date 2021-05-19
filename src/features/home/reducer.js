import * as actions from './actions'

export default function(state = { danceForms: '', bannerData: ''}, action){
    switch(action.type){
        case actions.UPDATE_DANCEFORMS : 
            return {
                ...state,
                danceForms: action.payload
            }
        case actions.UPDATE_BANNER :
            return {
                ...state,
                bannerData: action.payload
            }
        default:
            return state
    }
}