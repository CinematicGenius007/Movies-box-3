
/* eslint-disable */
import { useState, useEffect } from 'react';
// import { useEffect } from 'react';



import '../static/stylesheet/menu.css';

const inBounds = (e) => {
		const rect = e.getBoundingClientRect()
		return (
			rect.top >= 193
			&& rect.top <= (243 + rect.height - 0.5)
		)
	}


const Menu = ({ history, show, onClose }) => {

	const [historyShow, setHS] = useState(false)

	useEffect(() => {
		(async () => {
			collapseHistory()
			setHS(false)
		})()
	}, [show])

	function handleScroll(e) {
		var cards = document.querySelectorAll('.history-el')
		for (var i = 0; i < cards.length; i++) {
			if (inBounds(cards[i])) 
				cards[i].classList.add('highlight')
			else 
				cards[i].classList.remove('highlight')
		}
	}

	const handleHistoryCollapse = () => {
		var hc = document.querySelector('.history-container')
		if (historyShow) 
			collapseHistory()
		else if (!historyShow) 
			showHistory()
		setHS(!historyShow)
	}

	const collapseHistory = () => {
		var hc = document.querySelector('.history-container')
		var hh = document.querySelector('.product-heading.history-h')
		hc.style.height = '0px'
		hc.style.paddingTop = '0px'
		hc.style.paddingBottom = '0px'
		hh.style.textDecoration = 'initial'
	}

	const showHistory = () => {
		var hc = document.querySelector('.history-container')
		var hh = document.querySelector('.product-heading.history-h')
		hc.style.height = '250px'
		hc.style.paddingTop = '100px'
		hc.style.paddingBottom = '50px'
		hh.style.textDecoration = 'overline'
	}

	// const capitalize = (str) => {
	// 	const lower = str.toLowerCase()
	// 	return str.charAt(0).toUpperCase() + lower.slice(1)
	// }
	

	return (
		<>
			<section className='menu-offcanvas'
				style={{ left: show ? '0px' : '-400px' }}>
				<div className='close-btn'>
					<button className='btn btn-dark' 
						onClick={onClose}
						style={{ 
							background: 'none',
							outline: 'none',
							border: 'none',
							boxShadow: 'none',
							fontSize: '2rem',
						}} >
						&#10006;
					</button>
				</div>
				
				<div className='history-box'>
					<h3 className='product-heading history-h'
						onClick={handleHistoryCollapse}
						style={{ cursor: 'pointer' }}>
						History
					</h3>
					{<div className='history-container' onScroll={handleScroll}>
						{history.map((item, index) => (
							<div key={index}
								className='history-el' >
								<div>{item.name || item.searchValue || ''}</div>
								<div style={{ 
									fontSize: '0.9rem', 
									color: 'darkgray' 
								}}>
									{item.clock || ''}
								</div>
							</div>
						))}
					</div>}
				</div>
			</section>
        </>
	)
}

export default Menu;