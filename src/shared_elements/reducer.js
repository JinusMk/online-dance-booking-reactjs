import * as actions from './actions';
import produce from 'immer';

export default function(
    state = {
      toastLists: [],
      isLoggedIn: false,
      userInfo: '',
    //   selectedDance: '',
    //   selectedDate: {
    //       date: '',
    //       time: ''
    //   }
    }, action){
        switch(action.type){
            case actions.CLEAR_TOAST:
                return {
                  ...state,
                  toastLists: []
                }
            case actions.SHOW_TOAST:
                if(action.payload.toastType == 'error'){
                    if(state.toastLists.filter(toast => toast.toastType == 'error').length < 1){
                        return {
                            ...state,
                            toastLists: produce(state.toastLists, draft => {
                                draft.push(action.payload)
                            }),
                        }
                    }else{
                        return state;
                    }
                }else{
                    return {
                        ...state,
                        toastLists: produce(state.toastLists, draft => {
                            draft.push(action.payload)
                        })
                    }
            }
            case actions.HIDE_TOAST:
                if(state.toastLists){
                  return {
                    ...state,
                    toastLists: [],
                  }
                }else{
                  return state;
            }
            case actions.AUTH_STATUS_UPDATE: 
                return {
                    ...state,
                    isLoggedIn: action.payload
                }
            case actions.UPDATE_USERINFO: 
                return {
                    ...state,
                    userInfo: action.payload
                }
            // case actions.UPDATE_SELECTED_DANCE: 
            //     return{
            //         ...state,
            //         selectedDance: action.payload
            //     }
            // case actions.UPDATE_SELECTED_DATE: 
            //     return{
            //         ...state,
            //         selectedTime: action.payload
            //     }
            default:
                return state;
    
        }
}