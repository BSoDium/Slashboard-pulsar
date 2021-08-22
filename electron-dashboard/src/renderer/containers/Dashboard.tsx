import React from 'react';

import ControlPanel from 'renderer/containers/ControlPanel';
import SideBar from 'renderer/containers/SideBar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

interface State {
  tab: JSX.Element;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tab: <ControlPanel />
    };

    this.setTab = this.setTab.bind(this);
  }

  setTab(tab: JSX.Element) {
    this.setState({ tab });
  }

  render() {
    const { tab } = this.state;
    return (
      <div className="dashboard-wrapper">
        <SideBar tab={tab} setTab={this.setTab} />
        {tab}
      </div>
    );
  }
}

export default Dashboard;
