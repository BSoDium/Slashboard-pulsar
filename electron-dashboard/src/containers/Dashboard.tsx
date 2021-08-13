import React from 'react';
import { Redirect } from 'react-router-dom'

import ControlPanel from 'containers/ControlPanel'

interface Props { }

interface State {
  authFailed: boolean;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authFailed: false,
    };
  }

  render() {
    return (
      this.state.authFailed
        ?
        <Redirect to="/login" />
        :
        <div>
          <div className="dashboard-wrapper">
            <div className="sidebar">
              Sidebar data
            </div>
            <ControlPanel />
          </div>
        </div>
    );
  }
}

export default Dashboard;
