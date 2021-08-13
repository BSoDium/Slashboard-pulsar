import React from 'react';
import { RouteComponentProps } from 'react-router-dom';


interface Props {
}

interface State {
  username: string;
  password: string;
  rememberMe: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    const name = target.name
    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  }

  handleCheckBoxChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.checked;
    const name = target.name
    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  }

  handleLogin() {
    // database stuff (not implemented yet)

    // atm we're just letting anyone login
    // this.props.history.push('/', { authFailed: false });
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="card-header">
            <h1>L o g i n</h1>
            <h2>Server dashboard</h2>
          </div>
          <div className="card-body">
            <input type="text" id="username" name="username" placeholder="Username" required onChange={this.handleInputChange} />
            <input type="password" id="password" name="password" placeholder="Password" required onChange={this.handleInputChange} />

            <div className="settings-banner">
              <div className="autologin">
                <input
                  type="checkbox"
                  id="autologin"
                  name="rememberMe"
                  style={{ marginTop: "0px" }}
                  onChange={this.handleCheckBoxChange}
                />
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <a href="#" className="password-retrieval">Forgot password</a>
            </div>

            <div className="login-submit">
              <button type="button" className="btn-secondary">
                Sign up
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ float: "right" }}
                onClick={this.handleLogin}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
