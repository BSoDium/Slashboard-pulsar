import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faSignOutAlt, faPowerOff, faCog, faChevronRight, faChevronLeft, faClipboardList, faInfoCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons'

import ControlPanel from 'renderer/containers/ControlPanel';
import IOT from 'renderer/containers/IOT';
import Logs from 'renderer/containers/Logs';

const tabDictionary: { [key: string]: JSX.Element } = {
	'Servers': <ControlPanel />,
	'IOT': <IOT />,
	'Logs': <Logs />,
}

interface buttonProps {
	icon: IconDefinition;
	text: string;
	isOpen: boolean;
	tab: JSX.Element;
	setTab: (tab: JSX.Element) => void;
	disabled: boolean;
}

const SideBarButton = ({ icon, text, isOpen, tab, setTab, disabled }: buttonProps) => {
	const statusColor = disabled ? "rgba(124, 124, 124, 0.548)" : "white"
	return (
		<div className={`sidebar-button${disabled ? "" : "-enabled"}`}
			style={tab.type === tabDictionary[text].type ? {
				backgroundColor: 'rgba(88, 95, 110, 0.397)'
			} : {}}
			onClick={() => {
				if (!disabled) {
					setTab(tabDictionary[text])
				}
			}}
		>
			<FontAwesomeIcon icon={icon} size="lg" className="sidebar-button-icon" style={isOpen ?
				{ display: "inline-block", verticalAlign: "middle" } :
				{ display: "block", marginLeft: "auto", marginRight: "auto" }
			}
				color={statusColor}
			/>
			{isOpen ?
				<span className="sidebar-button-text"
					style={{ color: statusColor }}
				>{text}</span> :
				null
			}
		</div>
	);
};

interface Props {
	tab: JSX.Element;
	setTab: (tab: JSX.Element) => void;
}

interface State {
	isSideBarOpen: boolean;
}

class SideBar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			isSideBarOpen: false
		};
	}

	render() {
		const { isSideBarOpen } = this.state;
		const { tab } = this.props;
		return (
			<div
				className="sidebar-wrapper"
				style={{
					width: (isSideBarOpen ? "300px" : "60px"),
					transition: "all 0.2s ease-in-out",
				}}
			>
				<div className="sidebar-control" style={isSideBarOpen ? { justifyContent: "space-between" } : { justifyContent: "center" }}>
					{isSideBarOpen ?
						<>
							<Link to="/settings">
								<button type="button" className="sidebar-control-button">
									<FontAwesomeIcon icon={faCog} size="lg" />
								</button>
							</Link>
							<Link to="/info">
								<button type="button" className="sidebar-control-button">
									<FontAwesomeIcon icon={faInfoCircle} size="lg" />
								</button>
							</Link>
							<Link to="/">
								<button type="button" className="sidebar-control-button">
									<FontAwesomeIcon icon={faSignOutAlt} size="lg" />
								</button>
							</Link>
							<button type="button" className="sidebar-control-button" onClick={() => {
								this.setState({ isSideBarOpen: false });
							}}>
								<FontAwesomeIcon icon={faChevronLeft} size="lg" />
							</button>
						</>
						:
						<button type="button" className="sidebar-control-button" onClick={() => {
							this.setState({ isSideBarOpen: true });
						}}>
							<FontAwesomeIcon icon={faChevronRight} size="lg" />
						</button>
					}
				</div >
				<SideBarButton icon={faClipboard} text="Servers" isOpen={isSideBarOpen} tab={tab} setTab={this.props.setTab} disabled={false} />
				<SideBarButton icon={faPowerOff} text="IOT" isOpen={isSideBarOpen} tab={tab} setTab={this.props.setTab} disabled={true} />
				<SideBarButton icon={faClipboardList} text="Logs" isOpen={isSideBarOpen} tab={tab} setTab={this.props.setTab} disabled={false} />
			</div >
		);
	}
}

export default SideBar;

