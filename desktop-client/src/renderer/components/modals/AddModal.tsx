import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import ModalHandler, {
  HandlerToken,
} from 'renderer/components/modals/ModalHandler';

interface AddModalProps {
  token: HandlerToken;
}

interface AddModalState {}

class AddModal extends React.Component<AddModalProps, AddModalState> {
  constructor(props: AddModalProps) {
    super(props);
  }

  render() {
    const { token } = this.props;
    return (
      <Modal>
        <ModalHeader>
          <div
            className="modal-title-spacer"
            style={{ padding: '15px 0px 15px 20px', background: '#0e3455' }}
          >
            <h2 className="h-normal h-primary">Add device</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <div
            className="modal-body-spacer"
            style={{ padding: '20px', color: '#fff' }}
          >
            This modal isn't finished yet, you just can't add your own servers
            at the moment, sorry
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="button-band">
            <button
              className="btn-standard b-secondary b-shadow"
              onClick={() => {
                ModalHandler.disable(token);
              }}
            >
              Cancel
            </button>
            <button
              className="btn-standard b-primary b-shadow"
              onClick={() => {
                ModalHandler.disable(token);
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

export default AddModal;
