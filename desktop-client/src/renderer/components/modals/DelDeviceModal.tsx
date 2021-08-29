import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import ModalHandler, {
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { Server } from 'renderer/components/Server';

interface Props {
  token: HandlerToken;
}

interface State {}

class DelDeviceModal extends React.Component<Props, State> {
  render() {
    const { token } = this.props;
    return (
      <Modal height="fit-content" width="700px">
        <ModalHeader
          style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
        >
          <h2 className="h-normal h-primary">
            <FontAwesomeIcon
              size="1x"
              icon={faMinusSquare}
              style={{ marginRight: '25px' }}
            />
            Delete device
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
          Are you sure you want to delete this server ?
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
              Probably
            </button>
            <button
              type="submit"
              className="btn-standard b-primary b-shadow"
              onClick={() => {
                const emitter = token.emitter as Server;

                // ipcRenderer bridge
                window.electron.ipcRenderer.storage.delServer(emitter.getId());
                // close modal
                ModalHandler.disable(token);
                // update server list
                emitter.props.listRefresh();
              }}
            >
              Yes
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DelDeviceModal;
