// import { useState, useEffect } from 'react';



const Footer = ({ time }) => {
	return (
		<footer >
			<div className='footer-links'></div>
			<div className='date'>{time && time.slice(0, 15)}</div>
			<div className='time'>{time && time.slice(16)}</div>
			<div className='info'>
				React Project <span>&copy;</span> of Entertainment Enthusiasts
			</div>
		</footer>
	)
}

export default Footer;