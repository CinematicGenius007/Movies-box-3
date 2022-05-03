import React, { Component } from 'react';
import Cast from './CastCard.js';
import Videos from './Videos.js';
import '../static/stylesheet/movieCard.css';
import { Swiper, SwiperSlide } from 'swiper/react';


import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"



import SwiperCore, { Navigation } from 'swiper/core';


SwiperCore.use([Navigation]);


const baseImgUrl = 'https://image.tmdb.org/t/p/'
const baseWebUrl = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=6cab8f1bc6c79b46b07caa568a62bd8d';



export default class TvCard extends Component {

	constructor(props) {
		super(props)
		this.state = {
			getBackdropImg: () => {
				return (this.props.details.backdrop_path != null 
					? baseImgUrl + 'w1280' 
					+ this.props.details.backdrop_path 
					: '');
			},
			getMainImg: () => {
				return (baseImgUrl 
				+ 'w500' 
				+ this.props.details.poster_path);
			},
			getGenres: () => {
				const genEl = this.props.details.genres
				if (genEl.length === 0) {
					return ''
				} else {
					let elToReturn = genEl[0].name
					let i = 0
					for (i = 1; i < genEl.length; i++) {
						elToReturn = elToReturn.concat(', ', genEl[i].name)
					}
					return elToReturn
				}
			},
			getRuntime: () => {
				const rtm = this.props.details.episode_run_time[0]
				let hrP = Math.floor(rtm / 60) > 0 
					? Math.floor(rtm / 60) + 'h '
					: ''
				let minP = (rtm % 60) ? (rtm % 60) + 'm' : ''
				return (hrP + minP)
			},
			getCastProfileImg: (path) => {
				return (baseImgUrl + 'w400' + path);
			},
			currentCast: null,
			
		}
	}
	

	render() {
		return (
			<>
			{true && <div className='tv-container' >
				
				<div className='backdrop-container'>
					<img src={this.state.getBackdropImg()} alt='' />
				</div>
				<div className='tv-title'>
					<h1>{this.props.details.original_name}</h1>
					<h5 className='title-sub'>
						<span>{this.state.getRuntime()}</span>
						{this.props.details.episode_run_time.length > 0 
							&& <span className='ttSeperator'></span>}
						<span>{this.state.getGenres()}</span>
						{this.props.details.first_air_date.length > 0 
							&& <span className='ttSeperator'></span>}
						<span>{this.props.details.first_air_date.slice(0, 4)}</span>
						
					</h5>
				</div>
				<div className='tv-poster-overview'>
					<div className='tv-poster-container'>
						<img className='tv-Poster' src={this.state.getMainImg()} alt='' />
					</div>
					<div className='tv-overview'>
						<p>
							{this.props.details.overview.length > 0 
								&& <h2 className='lime-headings part'>
								Overview
							</h2>}
							{this.props.details.overview}
							{this.props.details.tagline.length > 0 && <hr id='line-of-break' />}
							{this.props.details.tagline.length > 0 && <blockquote id='catch-phrase'>{this.props.details.tagline}</blockquote>}
						</p>
					</div>
				</div>
				{this.props.subDeets.cast.length > 0
					&& <h2 className='lime-headings'>Cast</h2>}
				<div className='tv-credits'>
					{window.innerWidth > 1200 && <div className='tv-casts' 
						style={{ maxHeight: this.props.subDeets.cast.length < 7 ? '540px' : '820px' }}>
						{this.props.subDeets.cast.map((cast, index) => (
							<div key={index} className='tv-cast-container'>
								{cast.profile_path != null ? <img 
									src={this.state.getCastProfileImg(cast.profile_path)} 
									alt={cast.name}
									height='180px'
									width='120px' 
									onClick={() => this.props.onCreditClick(cast.credit_id, cast.id)}
									style={{ cursor: 'pointer' }}
								/> 
								: <h2 className='cast-photo-backup' 
									onClick={() => this.props.onCreditClick(cast.credit_id, cast.id)}>{cast.name}</h2>}
								
							</div>
						))}

					</div>}
					{window.innerWidth <= 1200 && <div className='tv-casts-media-query-w900'>
						<Swiper slidesPerView={4} 
							spaceBetween={10} 
							loop={false} 
							navigation={true} 
							centeredSlides={true}
							className="mySwiper">
							{this.props.subDeets.cast.map((cast, index) => (
								<SwiperSlide key={index}>
									{cast.profile_path != null ? <img 
										src={this.state.getCastProfileImg(cast.profile_path)} 
										alt={cast.name}
										height='180px'
										width='120px' 
										onClick={() => this.props.onCreditClick(cast.credit_id, cast.id)}
										style={{ cursor: 'pointer' }}
									/> 
									: <h2 className='cast-photo-backup' 
										onClick={() => this.props.onCreditClick(cast.credit_id, cast.id)}>{cast.name}</h2>}	
								</SwiperSlide>
							))}
						</Swiper>
					</div>}
					{false && <div className='vertical-divider'></div>}
					<Cast 
						details={this.props.creditInfo}
						totalCast={this.props.subDeets.cast.length}
					/>
				</div>
				
			</div>}
			{this.props.videos && this.props.videos.results.length > 0 && <Videos videos={this.props.videos} />}
			</>
		)
	}
}


// {false && <div>
// 	<div>{cast.original_name}</div>
// 	<div>as</div>
// 	<div>{cast.character}</div>
// </div>}