import React from 'react';

import Server from 'renderer/components/cards/Server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface State {
  servers: any[];
}

class ServerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      servers: [],
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
        },
        {
          ip: '192.168.1.54',
          port: '5000',
          auth: 'ljepm89w3a9zeqfbrjsfhz1olt7vta47bwohedxr789wiuhiyfew3jz45pi4b3b8bjkarank8qdjh8dmawc0bfe35bh9k7x65erlfgjuavq1vvzmvuljumbv6itik5az2vuzth22u8d7so3fqy9bv95llv6pngs0uivcqy1zcvx5fecvgx8y8fzv8qompd3qnrhht96y',
        },
      ],
    });
  }

  render() {
    const { servers } = this.state;
    return (
      <div className="list-wrapper">
        <div className="list-title">
          <h1>Server List</h1>
        </div>
        <div className="list-content">
          {servers.map((serverData) => {
            return (
              <Server
                key={parseInt(serverData.ip.split('.').join(''), 10)}
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
