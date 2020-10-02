import { getStore } from '../store/globalStore';
import { SHOW_TOAST, HIDE_TOAST, CLEAR_TOAST } from '../shared_elements/actions';

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