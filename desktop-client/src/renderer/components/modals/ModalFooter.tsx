import React from 'react';

interface ModalFooterProps {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

interface ModalFooterState {}

class ModalFooter extends React.Component<ModalFooterProps, ModalFooterState> {
  static defaultProps = {
    shadow: false,
  };
  constructor(props: ModalFooterProps) {
    super(props);
  }

  render() {
    const { children, style } = this.props;
    return (
      <div className="modal-footer" style={style}>
        {children}
      </div>
    );
  }
}

export default ModalFooter;
