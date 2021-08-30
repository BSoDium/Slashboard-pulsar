import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import ModalHandler, {
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

interface Props {
  token: HandlerToken;
}

interface State {
  appVersion: string;
}

class InfoModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appVersion: '',
    };
  }

  async componentDidMount() {
    const appVersion = await window.electron.ipcRenderer.getVersion();
    this.setState({ appVersion });
  }

  render() {
    const { token } = this.props;
    const { appVersion } = this.state;
    return (
      <Modal height="fit-content" width="500px">
        <ModalHeader
          style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
        >
          <h2 className="h-normal h-primary">About Slashboard</h2>
        </ModalHeader>
        <ModalBody
          style={{
            padding: '20px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="spacer">
            {/* Slashboard logo should be here */}
            <h3>Slashboard {appVersion} pre-release - Do not distribute</h3>
            <p>
              Developer : Philippe Jerzy (l3alr0g)
              <br />
              Contact :{' '}
              <a href="mailto:negreljerzy.philippe@gmail.com" target="_blank">
                negreljerzy.philippe@gmail.com
              </a>
              <br />
              Bug reports :{' '}
              <a href="https://github.com/l3alr0g/Slashboard/issues">
                Github issues
              </a>
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="button-band">
            <button
              type="reset"
              className="btn-standard b-dark"
              onClick={() => {
                // close modal
                ModalHandler.disable(token);
              }}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default InfoModal;
