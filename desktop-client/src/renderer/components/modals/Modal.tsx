import React from 'react';

interface ModalProps {
  shadow?: boolean;
  height?: string;
  width?: string;
  children?: JSX.Element | JSX.Element[];
}

interface ModalState {}

class Modal extends React.Component<ModalProps, ModalState> {
  static defaultProps = {
    shadow: false,
    children: null,
  };
  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    const { shadow, children, height, width } = this.props;
    return (
      <div className="modal-mask">
        <div
          className={`modal-wrapper${shadow ? ' md-shadow' : ''}`}
          style={{
            height,
            width,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
