import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import CPUChart from 'renderer/components/stats/CPUChart';
import RAMChart from 'renderer/components/stats/RAMChart';
import LoadingSpinner from 'renderer/components/loading/LoadingSpinner';
import Hardware from 'renderer/components/stats/Hardware';

import { InvalidKey, Unresponsive } from 'renderer/components/ContextMessages';

interface State {
  isLoading: boolean;
  response: PulsarResponse | undefined;
  fetchFailed: boolean;
}

class ServerStats extends React.Component<any, State> {
  interval!: NodeJS.Timeout;

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      response: undefined,
      fetchFailed: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(ip: string, port: string, auth: string) {
    const url = `http://${ip}:${port}/${auth}/status`;
    fetch(url)
      .then((response) => response.json())
      .then((response: PulsarResponse) => {
        this.setState({ response, isLoading: false });
        return response;
      })
      .catch(() => {
        this.setState({ isLoading: false, fetchFailed: true });
      });
  }

  componentDidMount() {
    const { ip, port, auth } = this.props.match.params;
    this.fetchData(ip, port, auth);

    this.interval = setInterval(() => {
      const { ip, port, auth } = this.props.match.params;
      this.fetchData(ip, port, auth);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { isLoading, response, fetchFailed } = this.state;
    const serverTimedOut = isLoading ? undefined : fetchFailed;
    const authFailed =
      !isLoading && !serverTimedOut && response?.data.status !== 'active';

    let content: JSX.Element;
    if (serverTimedOut) {
      // server is down or misconfigured, request timed out
      content = <Unresponsive />;
    } else if (authFailed) {
      // wrong key provided, server returned status "access denied"
      content = <InvalidKey />;
    } else if (!isLoading) {
      // response is readable, display stats
      const { ip, port } = this.props.match.params;
      content = (
        <div className="server-stats-wrapper">
          <div className="server-stats-titlebar">
            <div className="title-box">
              <h1>{response?.data.name}</h1>
              <h2>
                {ip}:{port}
              </h2>
            </div>
          </div>
          <div className="server-stats-content">
            <Hardware data={response?.data.hardware!} />
            <div className="server-stats-charts">
              <div className="chart-group">
                <CPUChart
                  coreStates={[response?.data.hardware.cpu.global!]}
                  duration={50}
                  title="CPU"
                  subtitle="Average load"
                />
                <CPUChart
                  coreStates={response?.data.hardware.cpu.cores!}
                  duration={50}
                  title="CPU"
                  subtitle="Core load"
                />
                <RAMChart // I need to somehow merge the memory and cpu charts into one component
                  memoryState={response?.data.hardware.memory!}
                  duration={50}
                />
                {/* <TempCharts /> */}
              </div>
            </div>
            {/* <Console /> */}
          </div>
        </div>
      );
    } else {
      content = <LoadingSpinner text={'Fetching data'} />;
    }
    return (
      <div className="body-wrapper">
        <div className="body-panel-wrapper">{content}</div>
      </div>
    );
  }
}

export default withRouter(ServerStats);
