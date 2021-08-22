import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Dashboard from 'renderer/containers/Dashboard'

interface HomePageState {
}

class HomePage extends React.Component<any, HomePageState> {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        // const { authSuccess } = this.props.location.state || false;

        // atm the login page is skipped
        const authSuccess = true;

        return (authSuccess ?
            <Dashboard />
            :
            <Redirect to="login" />
        );
    }
}

export default withRouter(HomePage);