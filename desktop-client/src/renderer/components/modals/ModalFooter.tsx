import React from 'react';


interface ModalFooterProps {
	children?: JSX.Element
}

interface ModalFooterState {
}

class ModalFooter extends React.Component<ModalFooterProps, ModalFooterState> {
	static defaultProps = {
		shadow: false
	}
	constructor(props: ModalFooterProps | Readonly<ModalFooterProps>) {
		super(props);
	}

	render() {
		const { children } = this.props
		return (
			<div className="modal-footer" style={{
			}}>
				{children}
			</div>
		);
	}
}

export default ModalFooter;