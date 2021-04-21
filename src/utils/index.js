import { getStore } from '../store/globalStore';
import { SHOW_TOAST, HIDE_TOAST, CLEAR_TOAST } from '../shared_elements/actions';
import moment from 'moment'

let store = getStore();

export const toastFlashMessage = (message, type, delay=4500) => {
    store = getStore();
    store.dispatch({
      type: CLEAR_TOAST,
      payload:''
    });
    setTimeout(function(){
      store.dispatch({
        type: SHOW_TOAST,
        payload: {
          message: message,
          toastType: type
        }
      });
      setTimeout(function() {
        store.dispatch({
          type: HIDE_TOAST,
          payload: {}
        });
      },delay);
    },200);
}

export const checkIsFinished = (date1, date2=moment()) => {
  // var b = moment(date1.slice(0, -1));
  var b = moment(date1);
  var a = moment(date2);
  var mins = a.diff(b, 'minutes')
  return mins > 0 ? true : false
}

export const checkNumberOfDaysLeft = (date1, date2=moment()) => {
  var a = moment(date1);
  var b = moment(date2);
  var days = a.diff(b, 'days') 
  return days
}