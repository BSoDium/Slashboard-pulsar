import React from 'react';

import Modal from 'renderer/components/modals/Modal';
import ModalHeader from 'renderer/components/modals/ModalHeader';
import ModalBody from 'renderer/components/modals/ModalBody';
import ModalFooter from 'renderer/components/modals/ModalFooter';
import { CompactState } from 'renderer/App';

interface AddModalProps {
  selfState: CompactState
}

interface AddModalState {
}

class AddModal extends React.Component<AddModalProps, AddModalState> {
  constructor(props: AddModalProps) {
    super(props);
  }

  render() {
    const { selfState } = this.props
    return (selfState.value ?
      (
        <Modal>
          <>
            <ModalHeader>
              <div className="modal-title-spacer" style={{ padding: "15px 0px 15px 20px", background: "#1441d3" }}>
                <h2 className="h-normal">Add device</h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="modal-body-spacer" style={{ padding: "20px" }}>
                This modal isn't finished yet, you just can't add your own servers at the moment
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="button-band">
                <button className="btn-standard b-secondary b-shadow" onClick={() => { selfState.setter(false) }}>
                  Cancel
                </button>
                <button className="btn-standard b-primary b-shadow" onClick={() => { selfState.setter(false) }}>
                  Done
                </button>
              </div>
            </ModalFooter>
          </>
        </Modal>
      )
      :
      null
    );
  }
}

export default AddModal;