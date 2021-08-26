import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SideBar from 'renderer/containers/SideBar';

interface Props {
  child: JSX.Element;
  match: any,
  location: any,
  history: any,
}


class Dashboard extends React.Component<Props, {}> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    // debug
    // console.log(this.props.location.pathname)

    const { child } = this.props
    return (
      <div className="dashboard-wrapper">
        <SideBar tab={child} />
        {child}
      </div>
    );
  }
}

export default withRouter(Dashboard);
