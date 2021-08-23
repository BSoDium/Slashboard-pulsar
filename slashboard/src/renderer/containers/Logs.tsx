import React from 'react';

interface LogsProps {
}

interface LogsState {
}

class Logs extends React.Component<LogsProps, LogsState> {
    constructor(props: LogsProps) {
        super(props);
    }

    render() {
        return (
            <div className="main-card-wrapper">
                Logs
            </div>
        );
    }
}

export default Logs;