import React from 'react';

interface HamburgerPropsInterface {
	isMenuOpen: boolean;
	className: string;
}
class Hamburger extends React.Component<{}, HamburgerPropsInterface> {
	constructor(props) {
		super(props);
		this.state = { isMenuOpen: false, className: "ham" };
	}

	handleClick() {
		if (!this.state.isMenuOpen) {
			this.setState({ isMenuOpen: true, className: "ham open" });
		} else {
			this.setState({ isMenuOpen: false, className: "ham" });
		}
	}

	render() {
		return (
			<div className={this.state.className} onClick={() => this.handleClick()}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	}
}

export default Hamburger;
