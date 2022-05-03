import React, { Component } from 'react';
import Logo from './PageLogo.js';
import { MenuRounded, Info } from '@material-ui/icons';



class Navbar extends Component {

	render() {
		return (
			<div className='nav-logo'>
				<div className='nav-link'
					onClick={this.props.onMenuClick}>
					<div className='nav-link-icon'>
						<MenuRounded size='large' style={{ filter: 'url(#shadow)' }} />
					</div>
					<span className='nav-link-text'>MENU</span>
				</div>
				<Logo />
				<div className='nav-link'>
					<div className='nav-link-icon'>
						<Info size='large' />
					</div>
					<span className='nav-link-text'>ABOUT</span>
				</div>
			</div>
		);
	}
}


export default Navbar;