import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import ErrorBoundary from './utils/ErrorBoundary'
import { homeRoutes } from './features/home/homeRoutes';
import { scheduleRoutes } from './features/schedule/scheduleRoutes';
import { profileRoutes } from './features/profile/profileRoutes';
import { bookingRoutes } from './features/booking/bookingRoutes';
import { ToastNotify } from './shared_elements';
import firebase from './utils/firebase'
import Page404 from './Page404'
import './assets/styles/app.scss';
import { AUTH_STATUS_UPDATE, UPDATE_USERINFO } from './shared_elements/actions'

const store = configureStore();

function App() {
  firebase.auth().onAuthStateChanged(user => {
    // console.log('inside onAUthState app.js', user)
    if(user){
      firebase.auth().currentUser.getIdToken(true)
      .then(idToken => {
        localStorage.setItem('idToken', JSON.stringify(idToken))
        store.dispatch({
          type: AUTH_STATUS_UPDATE,
          payload: true
        })
        store.dispatch({
          type: UPDATE_USERINFO,
          payload: user
        })
      })
    }else{
      store.dispatch({
        type: UPDATE_USERINFO,
        payload: ''
      })
      store.dispatch({
        type: AUTH_STATUS_UPDATE,
        payload: false
      })
      localStorage.removeItem('idToken')
    }
  })
  return (
    <div className="App">
       <Provider store={store}>
          <ToastNotify />
          <Router>
            <ErrorBoundary>
              <Switch>
                { homeRoutes.map(({path, component, key}, index) =>
                  <Route exact path={path} component={component} key={key} />
                )}
                { scheduleRoutes.map(({path, component, key}, index) =>
                  <Route exact path={path} component={component} key={key} />
                )}
                { profileRoutes.map(({path, component, key}, index) =>
                  <Route exact path={path} component={component} key={key} />
                )}
                { bookingRoutes.map(({path, component, key}, index) =>
                  <Route exact path={path} component={component} key={key} />
                )}
                {
                  <Route path='*' exact={true} component={Page404} />
                }
              </Switch>
            </ErrorBoundary>
          </Router>
       </Provider>
    </div>
  );
}

export default App;
