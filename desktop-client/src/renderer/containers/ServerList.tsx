import React from 'react';
import moment from 'moment';

import Server from 'renderer/components/Server';
import AddDeviceModal from 'renderer/components/modals/AddDeviceModal';
import {
  ModalHandler,
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import { CompactState } from 'renderer/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSync,
  faPlus,
  faWifi,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  offline: CompactState;
}

interface State {
  servers: any[];
  lastUpdated: Date;
  timeSinceLastUpdate: string;
}

class ServerList extends React.Component<Props, State> {
  interval!: NodeJS.Timeout;
  addModal: HandlerToken | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      servers: [],
      lastUpdated: new Date(),
      timeSinceLastUpdate: 'now',
    };

    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    // push modal to ModalHandler
    this.addModal = ModalHandler.push(AddDeviceModal, this);

    // fetch server list on component mount
    this.fetch();
    // update "Last fetched :" text and server list every 5000 ms
    this.interval = setInterval(async () => {
      this.fetch();
      this.setState({
        timeSinceLastUpdate: moment(this.state.lastUpdated).fromNow(),
      });
    }, 5000);
  }

  async fetch() {
    const servers = await window.electron.ipcRenderer.storage.getServers();
    this.setState({ servers });
  }

  componentWillUnmount() {
    // clear interval before unmounting
    clearInterval(this.interval);
  }

  render() {
    const { servers, timeSinceLastUpdate, lastUpdated } = this.state;
    const { offline } = this.props;
    return (
      <div className="body-panel-wrapper">
        {navigator.onLine || offline.value ? (
          <>
            <div className="list-titlebar-transparent">
              <div className="layout-btn-box">
                <h1>Servers</h1>
                <button
                  type="button"
                  className="btn-standard b-dark"
                  style={{ marginLeft: '20px' }}
                  onClick={() => {
                    ModalHandler.enable(this.addModal!);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="sm"
                    style={{
                      paddingRight: '10px',
                    }}
                  />
                  Add
                </button>
              </div>
              <div className="layout-btn-box">
                <div className="tooltip" style={{ marginRight: '15px' }}>
                  Last fetched : {timeSinceLastUpdate}
                </div>
                <button
                  className="btn-flat"
                  onClick={() => {
                    this.setState({
                      lastUpdated: new Date(),
                      timeSinceLastUpdate: 'now',
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSync}
                    style={{ paddingRight: '10px' }}
                  />
                  Reload
                </button>
              </div>
            </div>
            <div className="list-content">
              {Object.values(servers).map((serverData, i) => {
                const id = Object.keys(servers)[i];
                return (
                  <Server
                    key={`${id}-${lastUpdated.getTime()}`}
                    data={serverData}
                    id={id}
                    listRefresh={this.fetch}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="error-wrapper">
            <FontAwesomeIcon
              icon={faWifi}
              size="8x"
              color="#d4d4d4"
              style={{ paddingBottom: '30px' }}
            />
            <h1>Sorry</h1>
            <h2>We couldn't find the internet</h2>
            <div className="tag t-dark" style={{ marginTop: '30px' }}>
              <p style={{ fontWeight: 'bold' }}>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  color="#d4d4d4"
                  style={{ paddingRight: '7px' }}
                />
                Troubleshooting :
              </p>
              <p>
                This error is being displayed because your computer doesn't seem
                to be connected to the internet. In order to display relevant
                data, Slashboard needs a stable internet connection.
              </p>
              <p style={{ color: 'rgb(0, 255, 0)' }}>
                If you're using a wifi connection, try connecting to your router
                via ethernet. If this doesn't work, try rebooting the router.
              </p>
            </div>
            <button
              className="btn-standard b-dark b-shadow"
              style={{ marginTop: '30px' }}
              onClick={() => {
                offline.setter(true);
              }}
            >
              Ignore
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ServerList;
