import React, { Component } from 'react';



class Logo extends Component {

	render() {
		return (
			<div className='page-logo'>
				<a className='logo-container link-alike' style={{ fontSize: '2.380rem', userSelect: 'none'}} href='/'>
					<span className=''
						style={
							{
								fontFamily: 'Abril Fatface',
								color: '#0a0a14',
								backgroundColor: '#fbff00',
								padding: '1px 8px',
							}
						}
						>
						Movies
					</span>
					<span className=''
						style={
							{
								fontFamily: 'Anton',
								color: '#ffffff',
								backgroundColor: '#2000a2',
								textShadow: '2px 2px 2px #0a0a0a',
								padding: '0px 8px',
							}
						}
						>
						Box
					</span>
				</a>
			</div>
		);
	}
}


export default Logo;