import React from 'react';
import moment from 'moment';

import Server from 'renderer/components/cards/Server';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

interface State {
  servers: any[];
  lastUpdated: Date;
  timeSinceLastUpdate: string;
}

class ServerList extends React.Component<Props, State> {
  interval!: NodeJS.Timeout;
  constructor(props: Props) {
    super(props);
    this.state = {
      servers: [],
      lastUpdated: new Date(),
      timeSinceLastUpdate: "now",
    };
  }

  componentDidMount() {
    // atm we're hardcoding the server list
    this.setState({
      servers: [
        {
          ip: '127.0.0.1',
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
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { servers, timeSinceLastUpdate, lastUpdated } = this.state;
    return (
      <div className="list-wrapper">
        <div className="list-title">
          <h1>Devices</h1>
          <div className="title-controls">
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
      </div>
    );
  }
}

export default ServerList;
