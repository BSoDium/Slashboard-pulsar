/* eslint-disable no-nested-ternary */
import React from 'react';

import Loading from 'renderer/components/Loading';
import serverIcon from 'renderer/assets/icons/server.svg';
import pcIcon from 'renderer/assets/icons/pc.svg';
import phoneIcon from 'renderer/assets/icons/smartphone.svg';


interface iconDictionary {
  [key: string]: string;
}

const icons: iconDictionary = {
  server: serverIcon,
  pc: pcIcon,
  smartphone: phoneIcon
};

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

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    const { data } = this.props;
    const url = `http://${data.ip}:${data.port}/${data.auth}/status`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ response, isLoading: false });
        return response;
      })
      .catch(() => {
        this.setState({ response: 'none', isLoading: false });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { isLoading, response } = this.state;
    const { data } = this.props;
    return (
      <div className="server-wrapper">
        <img
          src={icons[data.type]}
          className="server-icon"
          alt="serverIcon"
          style={{ height: '100px', marginRight: '30px' }}
        />
        <div className="server-details">
          <h2>
            <span style={{ color: "#00ffb3" }}>{data.ip}</span>
            :
            <span style={{ color: "#00eaff" }}>{data.port}</span>
          </h2>
          {isLoading ? (
            // fetch is in progress
            <Loading />
          ) : // fetch is complete
            response === 'none' ? (
              // fetch failed
              <>
                <div className="tag">
                  <tr style={{ color: "red", fontWeight: "bold", textTransform: "uppercase" }}>Connection timeout</tr>
                  <tr>status : <span style={{ color: "#f44336", fontWeight: "bold" }}>down</span></tr>
                  <tr>Server is either misconfigured or inactive</tr>
                  <div className="tooltip" style={{ marginTop: "5px" }}>
                    An inactive server might be down for maintenance or under heavy
                    load.<br />If this problem persists, check your node js configuration.
                  </div>
                </div>

              </>
            ) : (
              // fetch succeeded
              <div className="tag">
                <tr style={{ color: "#5493ff", fontWeight: "bold", textTransform: "uppercase" }}>{response.data.name}</tr>
                <tr>status : <span style={{ color: (response.data.status === "active" ? "#00ff88" : "#ff001e"), fontWeight: "bold" }}>{response.data.status}</span></tr>
                <tr>
                  operating system : {response.data.os.type}&nbsp;
                  {response.data.os.architecture}&nbsp;build&nbsp;
                  {response.data.os.release}
                </tr>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Server;
