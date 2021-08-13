import React from 'react';
import icon from 'assets/icon.svg';
import { Redirect } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
  authFailed: boolean;
}

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authFailed: true,
    };
  }

  render() {
    return (
      this.state.authFailed
        ?
        <Redirect to="/login" />
        :
        <div>
          <div className="Hello">
            <img width="200px" alt="icon" src={icon} />
          </div>
          <h1>electron-react-boilerplate</h1>
          <div className="Hello">
            <a
              href="https://electron-react-boilerplate.js.org/"
              target="_blank"
              rel="noreferrer"
            >
              <button type="button">
                <span role="img" aria-label="books">
                  📚
                </span>
                Read our docs
              </button>
            </a>
            <a
              href="https://github.com/sponsors/electron-react-boilerplate"
              target="_blank"
              rel="noreferrer"
            >
              <button type="button">
                <span role="img" aria-label="books">
                  🙏
                </span>
                Donate
              </button>
            </a>
          </div>
        </div>
    );
  }
}

export default HomePage;
