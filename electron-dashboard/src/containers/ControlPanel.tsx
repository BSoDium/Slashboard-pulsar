import React from 'react';

import ServerList from 'containers/ServerList'

interface Props { }

interface State { }

class ControlPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="panel-wrapper">
        <ServerList />
        {/* there should also be a DeviceList element in future updates */}
      </div>
    );
  }
}

export default ControlPanel;