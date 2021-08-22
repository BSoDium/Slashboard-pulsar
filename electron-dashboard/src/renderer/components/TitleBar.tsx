import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMaximize, faWindowMinimize, faWindowClose } from '@fortawesome/free-solid-svg-icons'


interface Props { }

interface State {
  fullscreen: boolean;
}

class TitleBar extends React.Component<Props, State> {

  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      fullscreen: true // should be set by electron 
    };
  }

  render() {
    const { fullscreen } = this.state;
    return (
      <div className="titlebar-wrapper" style={{ display: fullscreen ? 'none' : 'auto' }}>
        <div className="titlebar-text">
          titlebar
        </div>
        <div className="titlebar-controls">
          <FontAwesomeIcon icon={faWindowMinimize} />
          <FontAwesomeIcon icon={faWindowMaximize} />
          <FontAwesomeIcon icon={faWindowClose} />
        </div>
      </div>
    );
  }
}

export default TitleBar;
