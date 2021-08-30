import React from 'react';

interface Props {}

interface State {}

export default class Settings extends React.Component<Props, State> {
  render() {
    return (
      <div className="body-wrapper">
        <div className="body-panel-wrapper">
          <div className="list-titlebar-transparent">
            <h1>settings</h1>
          </div>
          <div className="settings-container">
            <div className="setting-line">
              Setting content
              <label className="switch">
                <input type="checkbox" />
                <span className="slider rounded"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
