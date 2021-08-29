import React from 'react';

interface Props {
  text?: string;
}

interface State {}

class LoadingSpinner extends React.Component<Props, State> {
  static defaultProps = {
    text: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text } = this.props;
    return (
      <div className="Loader-container">
        <div className="spinner">ee</div>
        {text}
      </div>
    );
  }
}

export default LoadingSpinner;
