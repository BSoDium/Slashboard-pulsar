import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loading from 'renderer/components/Loading';
import serverIcon from 'renderer/assets/server.svg';
import pcIcon from 'renderer/assets/pc.svg';
import phoneIcon from 'renderer/assets/smartphone.svg';

const statusColorMap: { [key: string]: string } = {
  active: '#00ff88',
  'access denied': 'rgb(226, 178, 19)',
  down: '#ff001e',
};

interface iconDictionary {
  [key: string]: string;
}

const icons: iconDictionary = {
  server: serverIcon,
  pc: pcIcon,
  smartphone: phoneIcon,
};

interface Props {
  data: any;
  match: any;
  location: any;
  history: any;
}

interface State {
  isLoading: boolean;
  response: any;
}

class Server extends React.Component<Props, State> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

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
    const url = `http://${data.ip}:${data.port}/${data.auth}/status-compact`;
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
    const { data, history } = this.props;
    return (
      <div
        className="server-wrapper"
        onClick={() => {
          history.push(
            `/dashboard/servers/${data.ip}-${data.port}-${data.auth}`
          );
        }}
      >
        <img
          src={icons[data.type]}
          className="server-icon"
          alt="serverIcon"
          style={{ height: '100px', marginRight: '30px' }}
        />
        <div className="server-details">
          <h2>
            <span style={{ color: '#00ffb3' }}>{data.ip}</span>:
            <span style={{ color: '#00eaff' }}>{data.port}</span>
          </h2>
          {isLoading ? (
            // fetch is in progress
            <Loading />
          ) : // fetch is complete
          response === 'none' ? (
            // fetch failed
            <>
              <div className="tag t-dark">
                <div
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  Connection timeout
                </div>
                <div>
                  status :{' '}
                  <span style={{ color: '#f44336', fontWeight: 'bold' }}>
                    down
                  </span>
                </div>
                <div>Server is either misconfigured or inactive</div>
                <div className="tooltip" style={{ marginTop: '5px' }}>
                  An inactive server might be down for maintenance or under
                  heavy load.
                  <br />
                  If this problem persists, check your node js configuration.
                </div>
              </div>
            </>
          ) : (
            // fetch succeeded
            <div className="tag t-dark">
              <div
                style={{
                  color: '#5493ff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {response.data.name}
              </div>
              <div>
                status :{' '}
                <span
                  style={{
                    color: statusColorMap[response.data.status],
                    fontWeight: 'bold',
                  }}
                >
                  {response.data.status}
                </span>
              </div>
              <div>
                operating system :&nbsp;
                {response.data.os ? (
                  <>
                    {response.data.os.type}&nbsp;
                    {response.data.os.architecture}&nbsp;build&nbsp;
                    {response.data.os.release}
                  </>
                ) : (
                  'unknown'
                )}
              </div>
            </div>
          )}
        </div>
        <div className="server-actions"></div>
      </div>
    );
  }
}

export default withRouter(Server);
