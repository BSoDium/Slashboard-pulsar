import React from 'react';


interface ModalHeaderProps {
	children?: JSX.Element
}

interface ModalHeaderState {
}

class ModalHeader extends React.Component<ModalHeaderProps, ModalHeaderState> {
	static defaultProps = {
		shadow: false
	}
	constructor(props: ModalHeaderProps) {
		super(props);
	}

	render() {
		const { children } = this.props
		return (
			<div className="modal-header">
				{children}
			</div>
		);
	}
}

export default ModalHeader;