import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingSkeleton from 'renderer/components/loading/LoadingSkeleton';
import serverIcon from 'renderer/assets/server.svg';
import pcIcon from 'renderer/assets/pc.svg';
import phoneIcon from 'renderer/assets/smartphone.svg';
import ModalHandler, {
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';
import DelDeviceModal from 'renderer/components/modals/DelDeviceModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faSync } from '@fortawesome/free-solid-svg-icons';

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
  id: string;
  listRefresh: () => void;
  match: any;
  location: any;
  history: any;
}

interface State {
  isLoading: boolean;
  response: any;
  showMenu: boolean;
}

class Server extends React.Component<Props, State> {
  delModal: HandlerToken | undefined;

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
      showMenu: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  getId(): string {
    return this.props.id;
  }

  fetchData() {
    const { data } = this.props;
    const url = `http://${data.ip}:${data.port}/${data.auth}/status-compact`;
    this.setState({ isLoading: true });
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
    this.delModal = ModalHandler.push(DelDeviceModal, this);
    this.fetchData();
  }

  render() {
    const { isLoading, response, showMenu } = this.state;
    const { data, history } = this.props;
    return (
      <div
        className="server-wrapper"
        onMouseEnter={() => {
          this.setState({ showMenu: true });
        }}
        onMouseLeave={() => {
          this.setState({ showMenu: false });
        }}
      >
        <img
          src={icons[data.type]}
          className="server-icon"
          alt="serverIcon"
          onClick={() => {
            history.push(
              `/dashboard/servers/${data.ip}-${data.port}-${data.auth}`
            );
          }}
        />
        <div className="server-details">
          <div className="server-details-header">
            <h2>
              <span style={{ color: '#00ffb3' }}>{data.ip}</span>:
              <span style={{ color: '#00eaff' }}>{data.port}</span>
            </h2>
            {showMenu && (
              <div className="server-menu">
                <button
                  type="button"
                  className="btn-empty"
                  onClick={this.fetchData}
                >
                  <FontAwesomeIcon icon={faSync} />
                </button>
                <button type="button" className="btn-empty">
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  type="button"
                  className="btn-empty"
                  onClick={() => {
                    ModalHandler.enable(this.delModal!);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            // fetch is in progress
            <LoadingSkeleton />
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
                  If this problem persists, check your Pulsar configuration.
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
                  'unable to retrieve'
                )}
              </div>
            </div>
          )}
        </div>
        <div className="anchor">
          <div className="server-actions"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Server);
export { Server };
