import React from 'react';

interface Props {
  text?: string;
  height?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State { }

class Loading extends React.Component<Props, State> {
  static defaultProps = {
    text: '',
    height: '100%',
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, height } = this.props
    return (
      <div className="Loader-container" style={{ height }}>
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
        {text}
      </div>
    );
  }
}

export default Loading;
