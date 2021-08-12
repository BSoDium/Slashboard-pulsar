import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';

import 'styles/_app.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main className="App">
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    );
  }
}

export default App;
