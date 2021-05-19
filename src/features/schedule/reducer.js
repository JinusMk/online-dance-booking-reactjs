import * as actions from './actions';

export default function (state = { scheduleData : '' }, action){
        switch(action.type){
            case actions.UPDATE_SCHEDULE:
                return {
                    ...state,
                    scheduleData: action.payload
                }
            default:
                return state
        }
    }