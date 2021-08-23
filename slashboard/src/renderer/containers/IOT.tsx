import React from 'react';

interface IOTProps {
}

interface IOTState {
}

class IOT extends React.Component<IOTProps, IOTState> {
    constructor(props: IOTProps) {
        super(props);
    }

    render() {
        return (
            <div className="main-card-wrapper">
                IOT
            </div>
        );
    }
}

export default IOT;