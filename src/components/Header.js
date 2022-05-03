import React, { Component } from 'react';
import Form from './Form';
import Navbar from './Navbar';



class Header extends Component {

	render() {
		return (
			<header id="header">
				<Navbar onMenuClick={this.props.onMenuClick} />
				<Form onSubmit={this.props.onSubmit} />
			</header>
		);
	}
}


export default Header;