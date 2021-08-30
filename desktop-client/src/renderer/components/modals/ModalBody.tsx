import React from 'react';

interface ModalBodyProps {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

interface ModalBodyState {}

class ModalBody extends React.Component<ModalBodyProps, ModalBodyState> {
  static defaultProps = {
    shadow: false,
  };
  constructor(props: ModalBodyProps) {
    super(props);
  }

  render() {
    const { children, style } = this.props;
    return (
      <div className="modal-body" style={style}>
        {children}
      </div>
    );
  }
}

export default ModalBody;
