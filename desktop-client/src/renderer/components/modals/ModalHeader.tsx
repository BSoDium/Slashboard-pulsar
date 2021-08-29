import React from 'react';

interface ModalHeaderProps {
  children?: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}

interface ModalHeaderState {}

class ModalHeader extends React.Component<ModalHeaderProps, ModalHeaderState> {
  static defaultProps = {
    shadow: false,
  };
  constructor(props: ModalHeaderProps) {
    super(props);
  }

  render() {
    const { children, style } = this.props;
    return (
      <div className="modal-header" style={style}>
        {children}
      </div>
    );
  }
}

export default ModalHeader;
