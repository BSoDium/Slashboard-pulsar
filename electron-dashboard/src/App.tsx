import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';
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
            <Route path="/login" component={Login} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
