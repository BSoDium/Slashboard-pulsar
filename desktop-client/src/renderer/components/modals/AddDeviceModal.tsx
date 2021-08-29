import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import ModalHandler, {
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import ServerList from 'renderer/containers/ServerList';

interface Props {
  token: HandlerToken;
}

interface State {
  showHelp: boolean;
  ip: string;
  port: string;
  auth: string;
  type: string;
}

class AddDeviceModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showHelp: false,
      ip: '',
      port: '',
      auth: '',
      type: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(
    event:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const target = event.target as HTMLTextAreaElement;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  }

  render() {
    const { token } = this.props;
    const { showHelp, ip, port, auth, type } = this.state;
    return (
      <Modal height="fit-content" width="700px">
        <ModalHeader
          style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
        >
          <h2 className="h-normal h-primary">
            <FontAwesomeIcon
              size="1x"
              icon={faPlusSquare}
              style={{ marginRight: '25px' }}
            />
            Add device
          </h2>
        </ModalHeader>
        <ModalBody
          style={{
            padding: '20px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3 style={{ marginTop: '20px' }}>Networking</h3>
          <input
            type="text"
            id="ip"
            name="ip"
            placeholder="IP address"
            className="t-input"
            required
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            id="port"
            name="port"
            placeholder="Port"
            className="t-input"
            required
            onChange={this.handleInputChange}
          />
          <h3 style={{ marginTop: '40px' }}>
            Authentification&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="sm"
              color="grey"
              cursor="pointer"
              onClick={() => {
                this.setState({ showHelp: true });
              }}
            />
          </h3>
          <input
            type="password"
            id="auth"
            name="auth"
            placeholder="Pairing key"
            className="t-input"
            required
            onChange={this.handleInputChange}
          />
          <div
            className="tag t-dark"
            style={{
              display: showHelp ? 'block' : 'none',
            }}
          >
            <div className="h-bold h-primary">Where do I find this key ?</div>
            <div className="h-secondary" style={{ marginTop: '10px' }}>
              Pulsar attributes a unique key to your server when running the
              configuration script for the first time. If you did not write it
              down, you can still get it back, but this requires some digging :
              more info on&nbsp;
              <a
                href="https://github.com/l3alr0g/Slashboard/#readme"
                target="_blank"
              >
                Github
              </a>
            </div>
          </div>
          <h3 style={{ marginTop: '20px' }}>Icon</h3>
          <select
            name="type"
            id="device-type"
            className="t-input"
            onChange={this.handleInputChange}
          >
            <option value="server">Server</option>
            <option value="pc">PC</option>
            <option value="smartphone">SmartPhone</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <div className="button-band">
            <button
              type="reset"
              className="btn-standard b-secondary b-shadow"
              onClick={() => {
                // close modal
                ModalHandler.disable(token);
              }}
              style={{ marginRight: '10px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-standard b-primary b-shadow"
              onClick={() => {
                // ipcRenderer bridge
                console.debug(this.state);
                window.electron.ipcRenderer.storage.addServer(
                  ip,
                  port,
                  auth,
                  type
                );
                // close modal
                ModalHandler.disable(token);
                // update server list
                (token.emitter as ServerList).fetch();
              }}
            >
              Done
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddDeviceModal;
