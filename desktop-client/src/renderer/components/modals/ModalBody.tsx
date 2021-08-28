import React from 'react';


interface ModalBodyProps {
	children?: JSX.Element
}

interface ModalBodyState {
}

class ModalBody extends React.Component<ModalBodyProps, ModalBodyState> {
	static defaultProps = {
		shadow: false
	}
	constructor(props: ModalBodyProps) {
		super(props);
	}

	render() {
		const { children } = this.props
		return (
			<div className="modal-body">
				{children}
			</div>
		);
	}
}

export default ModalBody;