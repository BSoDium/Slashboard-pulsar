import React from 'react';

import ServerList from 'renderer/containers/ServerList';
import { CompactState } from 'renderer/App';


interface Props {
  offline: CompactState;
}

interface State { }

class ControlPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { offline } = this.props;
    return (
      <div className="body-wrapper">
        <ServerList offline={offline} />
        {/* there should also be a DeviceList element in future updates */}
      </div>
    );
  }
}

export default ControlPanel;
