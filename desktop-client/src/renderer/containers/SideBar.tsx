import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faSignOutAlt,
  faPowerOff,
  faCog,
  faChevronRight,
  faChevronLeft,
  faClipboardList,
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface buttonProps {
  icon: IconDefinition;
  text: string;
  componentName: string;
  isOpen: boolean;
  tab: JSX.Element;
  disabled?: boolean;
  history: any;
}

const SideBarButton = ({
  icon,
  text,
  componentName,
  isOpen,
  tab,
  disabled,
  history,
}: buttonProps) => {
  const statusColor = disabled ? 'rgba(124, 124, 124, 0.548)' : 'white';
  return (
    <div
      className={`sidebar-button${disabled ? '' : '-enabled'}`}
      style={
        tab.type.name === componentName
          ? {
              backgroundColor: 'rgba(88, 95, 110, 0.397)',
            }
          : {}
      }
      onClick={() => {
        if (!disabled) {
          const url = `/dashboard/${text.toLowerCase()}`;
          // console.debug(url)
          history.push(url);
        }
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        size="lg"
        className="sidebar-button-icon"
        fixedWidth
        color={statusColor}
      />
      {isOpen ? (
        <span className="sidebar-button-text" style={{ color: statusColor }}>
          {text}
        </span>
      ) : null}
    </div>
  );
};

interface Props {
  tab: JSX.Element;
  match: any;
  location: any;
  history: any;
}

interface State {
  isSideBarOpen: boolean;
}

class SideBar extends React.Component<Props, State> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isSideBarOpen: false,
    };
  }

  render() {
    const { isSideBarOpen } = this.state;
    const { tab, history } = this.props;
    return (
      <div
        className="sidebar-wrapper"
        style={{
          width: isSideBarOpen ? '300px' : '60px',
          transition: 'all 0.1s ease-in-out',
        }}
        onMouseEnter={() => {
          this.setState({ isSideBarOpen: true });
        }}
        onMouseLeave={() => {
          this.setState({ isSideBarOpen: false });
        }}
      >
        <div
          className="sidebar-control"
          style={
            isSideBarOpen
              ? { justifyContent: 'space-between' }
              : { justifyContent: 'center' }
          }
        >
          {isSideBarOpen ? (
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
              <button
                type="button"
                className="sidebar-control-button"
                onClick={() => {
                  this.setState({ isSideBarOpen: false });
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="sidebar-control-button"
              onClick={() => {
                this.setState({ isSideBarOpen: true });
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>
          )}
        </div>
        <SideBarButton
          icon={faClipboard}
          text="Servers"
          componentName={'ControlPanel'}
          isOpen={isSideBarOpen}
          tab={tab}
          history={history}
        />
        <SideBarButton
          icon={faPowerOff}
          text="IOT"
          componentName={'IOT'}
          isOpen={isSideBarOpen}
          tab={tab}
          disabled={true}
          history={history}
        />
        <SideBarButton
          icon={faClipboardList}
          text="Logs"
          componentName={'Logs'}
          isOpen={isSideBarOpen}
          tab={tab}
          disabled={true}
          history={history}
        />
      </div>
    );
  }
}

export default withRouter(SideBar);