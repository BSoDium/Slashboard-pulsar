import React from 'react';
import moment from 'moment';

import Server from 'renderer/components/Server';
import AddModal from 'renderer/components/modals/AddModal';


import { CompactState } from 'renderer/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faPlus, faWifi, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  offline: CompactState;
}

interface State {
  servers: any[];
  lastUpdated: Date;
  timeSinceLastUpdate: string;
  isAddModalOpen: boolean;
}

class ServerList extends React.Component<Props, State> {
  interval!: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = {
      servers: [],
      lastUpdated: new Date(),
      timeSinceLastUpdate: "now",
      isAddModalOpen: false
    };
  }

  componentDidMount() {
    // atm we're hardcoding the server list
    this.setState({
      servers: [
        {
          ip: 'localhost',
          port: '5000',
          auth: 'ljepm89w3a9zeqfbrjsfhz1olt7vta47bwohedxr789wiuhiyfew3jz45pi4b3b8bjkarank8qdjh8dmawc0bfe35bh9k7x65erlfgjuavq1vvzmvuljumbv6itik5az2vuzth22u8d7so3fqy9bv95llv6pngs0uivcqy1zcvx5fecvgx8y8fzv8qompd3qnrhht96y',
          type: "server"
        },
        {
          ip: '192.168.1.54',
          port: '5000',
          auth: 'ljepm89w3a9zeqfbrjsfhz1olt7vta47bwohedxr789wiuhiyfew3jz45pi4b3b8bjkarank8qdjh8dmawc0bfe35bh9k7x65erlfgjuavq1vvzmvuljumbv6itik5az2vuzth22u8d7so3fqy9bv95llv6pngs0uivcqy1zcvx5fecvgx8y8fzv8qompd3qnrhht96y',
          type: "pc"
        },
        {
          ip: '1.1.1.1',
          port: '7023',
          auth: 'ljepm89w3a9zeqfbrjsfhz1olt7vta47bwohedxr789wiuhiyfew3jz45pi4b3b8bjkarank8qdjh8dmawc0bfe35bh9k7x65erlfgjuavq1vvzmvuljumbv6itik5az2vuzth22u8d7so3fqy9bv95llv6pngs0uivcqy1zcvx5fecvgx8y8fzv8qompd3qnrhht96y',
          type: "pc"
        },
        {
          ip: '93.5.0.201',
          port: '4032',
          auth: 'ljepm89w3a9zeqfbrjsfhz1olt7vta47bwohedxr789wiuhiyfew3jz45pi4b3b8bjkarank8qdjh8dmawc0bfe35bh9k7x65erlfgjuavq1vvzmvuljumbv6itik5az2vuzth22u8d7so3fqy9bv95llv6pngs0uivcqy1zcvx5fecvgx8y8fzv8qompd3qnrhht96y',
          type: "smartphone"
        },
        {
          ip: '22.3.0.103',
          port: '4090',
          auth: 'ljepm89w3a9zeqfbrjsfhz1olt7vta47bwohedxr789wiuhiyfew3jz45pi4b3b8bjkarank8qdjh8dmawc0bfe35bh9k7x65erlfgjuavq1vvzmvuljumbv6itik5az2vuzth22u8d7so3fqy9bv95llv6pngs0uivcqy1zcvx5fecvgx8y8fzv8qompd3qnrhht96y',
          type: "smartphone"
        },
        {
          ip: '90.23.1.29',
          port: '4052',
          auth: 'ljepm89w3a9zeqfbrjsfhz1olt7vta47bwohedxr789wiuhiyfew3jz45pi4b3b8bjkarank8qdjh8dmawc0bfe35bh9k7x65erlfgjuavq1vvzmvuljumbv6itik5az2vuzth22u8d7so3fqy9bv95llv6pngs0uivcqy1zcvx5fecvgx8y8fzv8qompd3qnrhht96y',
          type: "smartphone"
        },
      ],
    });

    this.interval = setInterval(() => {
      this.setState({
        timeSinceLastUpdate: moment(this.state.lastUpdated).fromNow(),
      })
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { servers, timeSinceLastUpdate, lastUpdated, isAddModalOpen } = this.state
    const { offline } = this.props
    return (
      < div className="body-panel-wrapper" >
        {
          navigator.onLine || offline.value ? (
            <>
              <div className="list-titlebar-transparent">
                <div className="layout-btn-box">
                  <h1>Devices</h1>
                  <button
                    type="button"
                    className="btn-standard b-dark"
                    style={{ marginLeft: "20px" }}
                    onClick={() => { this.setState({ isAddModalOpen: true }) }}
                  >
                    <FontAwesomeIcon icon={faPlus} size="sm" style={{
                      paddingRight: "10px"
                    }}
                    />
                    Add
                  </button>
                </div>
                <div className="layout-btn-box">
                  <div className="tooltip" style={{ marginRight: "15px" }}>
                    Last fetched : {timeSinceLastUpdate}
                  </div>
                  <button className="btn-flat" onClick={() => {
                    this.setState({
                      lastUpdated: new Date(),
                      timeSinceLastUpdate: "now",
                    });
                  }}>
                    <FontAwesomeIcon icon={faSync} style={{ paddingRight: "10px" }} />
                    Reload
                  </button>
                </div>
              </div>
              <div className="list-spacer"></div>
              <div className="list-content">
                {servers.map((serverData) => {
                  return (
                    <Server
                      key={parseInt(serverData.ip.split('.').join(''), 10) + lastUpdated.getTime()}
                      data={serverData}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="error-wrapper">
              <FontAwesomeIcon icon={faWifi} size="8x" color="#d4d4d4" style={{ paddingBottom: "30px" }} />
              <h1>Sorry</h1>
              <h2>We couldn't find the internet</h2>
              <div className="tag t-dark" style={{ marginTop: "30px" }}>
                <p style={{ fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faInfoCircle} color="#d4d4d4" style={{ paddingRight: "7px" }} />
                  Troubleshooting :
                </p>
                <p>
                  This error is being displayed because your computer doesn't seem to be
                  connected to the internet. In order to display relevant data, Slashboard needs
                  a stable internet connection.
                </p>
                <p style={{ color: "rgb(0, 255, 0)" }}>
                  If you're using a wifi connection, try connecting to your router via ethernet.
                  If this doesn't work, try rebooting the router.
                </p>
              </div>
              <button
                className="btn-standard b-dark b-shadow"
                style={{ marginTop: "30px" }}
                onClick={() => {
                  offline.setter(true)
                }}
              >
                Ignore
              </button>
            </div>
          )
        }
        <AddModal selfState={{
          value: isAddModalOpen,
          setter: (value: boolean) => { this.setState({ isAddModalOpen: value }) }
        }} />
      </div >
    )
  }
}

export default ServerList;
