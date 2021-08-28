import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {}

interface State {
  fullscreen: boolean;
}

class TitleBar extends React.Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      fullscreen: false, // should be set by electron
    };
  }

  render() {
    const { fullscreen } = this.state;
    return (
      <div
        className="titlebar-wrapper"
        style={{ display: fullscreen ? 'none' : 'auto' }}
      >
        <div className="titlebar-text">Slashboard</div>
        <div className="titlebar-grabber"></div>
        <div className="titlebar-controls">
          <button
            type="button"
            className="titlebar-control-button"
            onClick={() => {
              window.electron.ipcRenderer.minimize();
            }}
          >
            <FontAwesomeIcon icon={faCircle} color="rgb(10, 163, 22)" />
          </button>
          <button
            type="button"
            className="titlebar-control-button"
            onClick={() => {
              window.electron.ipcRenderer.maximize();
            }}
          >
            <FontAwesomeIcon icon={faCircle} color="rgb(226, 178, 19)" />
          </button>
          <button
            type="button"
            className="titlebar-control-button"
            onClick={() => {
              window.electron.ipcRenderer.close();
            }}
          >
            <FontAwesomeIcon icon={faCircle} color="red" />
          </button>
        </div>
      </div>
    );
  }
}

export default TitleBar;
