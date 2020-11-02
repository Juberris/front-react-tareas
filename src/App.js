import React from 'react';
import Header from './components/Header';
import Tareas from './components/Tareas';
import NuevaTarea from './components/NuevaTarea';
import EditarTarea from './components/EditarTarea';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
          <Header />

          <div className="container mt-5">
              <Switch>
                  <Route exact path="/" component={Tareas} />
                  <Route exact path="/tareas/nuevo" component={NuevaTarea} />
                  <Route exact path="/tareas/editar/:id" component={EditarTarea} />
              </Switch>
          </div>
      </Provider>
    </Router>
  );
}

export default App;
