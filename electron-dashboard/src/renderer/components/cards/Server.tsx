/* eslint-disable no-nested-ternary */
import React from 'react';

import Loading from 'renderer/components/Loading';
import serverIcon from 'renderer/assets/icons/server.svg';

interface Props {
  data: any;
}

interface State {
  isLoading: boolean;
  response: any;
}

class Server extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      response: null,
    };
  }

  componentDidMount() {
    const fetchData = () => {
      const { data } = this.props;
      const url = `http://${data.ip}:${data.port}/${data.auth}/status`;
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          this.setState({ response, isLoading: false });
          return response;
        })
        .catch(() => {
          this.setState({ response: 'none', isLoading: false });
        });
    };
    fetchData();
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.props.data.ip);
  }

  render() {
    const { isLoading, response } = this.state;
    const { data } = this.props;
    return (
      <div className="server-wrapper">
        <img
          src={serverIcon}
          className="server-icon"
          alt="serverIcon"
          style={{ width: '100px', marginRight: '30px' }}
        />
        {isLoading ? (
          // fetch is in progress
          <div className="server-loading">
            <Loading />
          </div>
        ) : // fetch is complete
        response === 'none' ? (
          // fetch failed
          <div className="server-noresponse">
            <h2>
              Failed to establish connection with server at {data.ip}:
              {data.port}
            </h2>
            <p>Server is either misconfigured or inactive</p>
            <div
              className="tooltip"
              style={{ fontSize: '0.9rem', color: 'grey' }}
            >
              An inactive server might be down for maintenance or under heavy
              load. If this problem persists, check your node js configuration.
            </div>
          </div>
        ) : (
          // fetch succeeded
          <div className="server-response">
            <h2>
              Established connection with server at {data.ip}:{data.port}
            </h2>
            <tr>name : {response.data.name}</tr>
            <tr>status : {response.data.status}</tr>
            <tr>
              operating system : {response.data.os.type}&nbsp;
              {response.data.os.architecture}&nbsp;build&nbsp;
              {response.data.os.release}
            </tr>
          </div>
        )}
      </div>
    );
  }
}

export default Server;
