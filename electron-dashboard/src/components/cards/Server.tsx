import React from 'react';

interface Props {
  data: any;
}

interface State {
  isLoading: boolean;
  response: any;
}

class Server extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      response: null
    };
  }

  componentDidMount() {
    const fetchData = () => {
      const url = `http://${this.props.data.ip}:${this.props.data.port}/${this.props.data.auth}/status`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then(response => {
          this.setState({ response, isLoading: false });
        })
    }
    fetchData()
    console.log(this.props.data.ip)
  }

  render() {
    return (
      this.state.isLoading ?
        <div className="server-loading">
          <h2>Fetching data at {this.props.data.ip}:{this.props.data.port}...</h2>
        </div>
        :
        <div className="server-wrapper">
          <h2>Server found at {this.props.data.ip}:{this.props.data.port}</h2>
          <div className="server-status">
            <p>
              <tr>name : {this.state.response.data.name}</tr>
              <tr>status : {this.state.response.data.status}</tr>
              <tr>operating system : {this.state.response.data.os.type}&nbsp;
                {this.state.response.data.os.architecture}&nbsp;build&nbsp;
                {this.state.response.data.os.release}
              </tr>
              <tr>
                available central processing units :
                {
                  this.state.response.data.hardware.cpus.map((cpu: { model: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; speed: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => {
                    return (
                      <tr key={index}>
                        - &nbsp;{cpu.model} running at {cpu.speed}&nbsp;MHz
                      </tr>
                    )
                  })
                }
              </tr>
            </p>
          </div>
        </div>
    );
  }
}

export default Server;