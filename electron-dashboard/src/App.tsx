import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'containers/Dashboard';
import Login from 'containers/Login';

import 'sass/main.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State { }

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main className="App">
        <div className="App-container">
          <Switch>
            <Route path="/login" >
              <Login />
            </Route>
            <Route path="/" >
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
