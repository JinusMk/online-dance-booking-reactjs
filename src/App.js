import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import ErrorBoundary from './utils/ErrorBoundary'
import { homeRoutes } from './features/home/homeRoutes';
import { scheduleRoutes } from './features/schedule/scheduleRoutes';
import { profileRoutes } from './features/profile/profileRoutes';
import { bookingRoutes } from './features/booking/bookingRoutes';
import { helpRoutes } from './features/help/helpRoutes';
import './assets/styles/app.scss';

const store = configureStore();

function App() {
  return (
    <div className="App">
       <Provider store={store}>
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
                { helpRoutes.map(({path, component, key}, index) =>
                  <Route exact path={path} component={component} key={key} />
                )}
              </Switch>
            </ErrorBoundary>
          </Router>
       </Provider>
    </div>
  );
}

export default App;
