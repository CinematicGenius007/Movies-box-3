import React, { Component } from 'react';
import Noposter from '../static/noposter.jpg'

const baseImgUrl = 'https://image.tmdb.org/t/p/w300'

class QueryCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			getImage: () => {
				return (this.props.details.poster_path 
				|| this.props.details.profile_path) 
				? baseImgUrl + (this.props.details.poster_path 
				|| this.props.details.profile_path)
				: Noposter;
			},	
		}
	}

	render() {
		return (
			<div 
				className="qcard-container" 
				onClick={() => {this.props.onCardClick(this.props.details.id, this.props.details.media_type)}}>
				<div className='qcard-box'>
					<div className='qcard-image-container'>
						<div 
							className='q-card-img-container' 
							style={{ backgroundImage: `url(${this.state.getImage()})` }}>
						</div>
					</div>
					<div className='qcard-title'>{this.props.details.title || this.props.details.name}</div>
				</div>
			</div>
		);
	}
}


export default QueryCard;