import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import ErrorBoundary from './utils/ErrorBoundary'
import { homeRoutes } from './features/home/homeRoutes';
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
              </Switch>
            </ErrorBoundary>
          </Router>
       </Provider>
    </div>
  );
}

export default App;
