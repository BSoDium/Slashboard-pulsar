import React from 'react';
import TitleBar from 'renderer/components/TitleBar';

interface WindowProps {
    children: JSX.Element;
}

interface WindowState {
}

class Window extends React.Component<WindowProps, WindowState> {
    constructor(props: WindowProps) {
        super(props)
    }

    render() {
        const { children } = this.props
        return (
            <div className="window-wrapper">
                <TitleBar />
                {children}
            </div>
        );
    }
}

export default Window;