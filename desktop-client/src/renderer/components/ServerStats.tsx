import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken, faLock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Loading from 'renderer/components/Loading';

interface State {
	isLoading: boolean;
	response: any;
}

class ServerStats extends React.Component<any, State> {
	interval!: NodeJS.Timeout;

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			response: null,
		}
		this.fetchData = this.fetchData.bind(this)
	}

	fetchData(ip: string, port: string, auth: string) {
		const url = `http://${ip}:${port}/${auth}/status`
		fetch(url)
			.then((response) => response.json())
			.then((response) => {
				this.setState({ response, isLoading: false });
				return response
			})
			.catch(() => {
				this.setState({ response: 'none', isLoading: false });
			})
	}

	componentDidMount() {
		const { ip, port, auth } = this.props.match.params
		this.fetchData(ip, port, auth)

		this.interval = setInterval(() => {
			const { ip, port, auth } = this.props.match.params
			this.fetchData(ip, port, auth)
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { isLoading, response } = this.state
		const serverTimedOut = isLoading ? undefined : (response.data === undefined)
		const authFailed = !isLoading && !serverTimedOut && response.data.status !== "active"

		let content: JSX.Element
		if (serverTimedOut) {
			// server is down or misconfigured, request timed out
			content = (
				<div className="error-wrapper">
					<FontAwesomeIcon icon={faHeartBroken} size="8x" color="#d4d4d4" style={{ paddingBottom: "30px" }} />
					<h1>Woops...</h1>
					<h2>Your server is unresponsive</h2>
					<div className="tag t-dark" style={{ marginTop: "30px" }}>
						<p style={{ fontWeight: "bold" }}>
							<FontAwesomeIcon icon={faInfoCircle} color="#d4d4d4" style={{ paddingRight: "7px" }} />
							Troubleshooting :
						</p>
						<p>
							This error is being displayed because the server failed to answer the
							client's request. It might be due either to a broken connection between the client and the server,
							or to the Pulsar service having stopped working.
						</p>
						<p style={{ color: "rgb(0, 255, 0)" }}>
							Try rebooting the server. If this doesn't work, try reinstalling Pulsar.
						</p>
					</div>
					<Link to='/'>
						<button className="btn-standard b-dark b-shadow" style={{ marginTop: "30px" }}>
							Go back
						</button>
					</Link>
				</div>
			)
		} else if (authFailed) {
			// wrong key provided, server returned status "access denied"
			content = (
				<div className="error-wrapper">
					<FontAwesomeIcon icon={faLock} size="8x" color="#d4d4d4" style={{ paddingBottom: "30px" }} />
					<h1>Sorry</h1>
					<h2>That key's not gonna work</h2>
					<div className="tag t-dark" style={{ marginTop: "30px" }}>
						<p style={{ fontWeight: "bold" }}>
							<FontAwesomeIcon icon={faInfoCircle} color="#d4d4d4" style={{ paddingRight: "7px" }} />
							Troubleshooting :
						</p>
						<p>
							This error is being displayed because the server returned the
							"access denied" status. This generally means that the pairing key is invalid
							and needs to be updated.
						</p>
						<p style={{ color: "rgb(255, 0, 0)" }}>
							No quick fix is available at the moment. Please file an issue.
						</p>
					</div>
					<Link to='/'>
						<button className="btn-standard b-dark b-shadow" style={{ marginTop: "30px" }}>
							Go back
						</button>
					</Link>
				</div>
			)
		} else if (!isLoading) {
			// response is readable, display stats
			const { ip, port } = this.props.match.params
			content = (
				<>
					<div className="server-stats-titlebar">
						<div className="title-box">
							<h1>{response.data.name}</h1>
							<h2>{ip}:{port}</h2>
						</div>
					</div>
					<div className="server-stats-content">
						<div className="server-wrapper">
							<div className="tag t-dark">
								<tr>{response.data.os.type}</tr>
								{response.data.hardware.cpus.map((cpu: any) => {
									return (
										<tr>{cpu.model} :&nbsp;&nbsp;&nbsp; {cpu.speed} Mhz</tr>
									)
								})}
								<tr>memory : {response.data.hardware.memory.free / response.data.hardware.memory.total} %</tr>
							</div>
						</div>
					</div>
				</>
			)
		} else {
			content = <Loading />
		}
		return (
			<div className="body-wrapper">
				<div className="body-panel-wrapper">
					{content}
				</div>
			</div>
		);
	}
}

export default withRouter(ServerStats);