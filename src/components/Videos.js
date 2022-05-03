
/* eslint-disable */
import { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

// import "./styles.css";

import SwiperCore, { Navigation } from 'swiper/core';


SwiperCore.use([Navigation]);


const _baseImgUrl = 'https://image.tmdb.org/t/p/w500'
// const baseWebUrl = 'https://api.themoviedb.org/3';
// const API_KEY = '?api_key=6cab8f1bc6c79b46b07caa568a62bd8d';

const Videos = ({ videos }) => {
	const [clips, setClips] = useState([])
	const [cT, setTransform] = useState(0)
	const [cState, setCState] = useState(1)

	useEffect(() => {
		(async () => {

			if (videos != null) {
				setClips(videos.results)
				console.log(videos.results)
				CarouselStyling(videos.results.length)
			} 

		})()
	}, [videos])

	

	const CarouselStyling = (n) => {
		var s_btn_prev = document.querySelector('.swiper-button-prev.csl')
		var s_btn_next = document.querySelector('.swiper-button-next.csl')
		var CC = document.querySelector('.carousel-container')
		console.log('n = ' + n)
		if (n === 1){
			s_btn_prev.classList.add('no-show')
			s_btn_next.classList.add('no-show')
		} else {
			checkCState(cState)
		}

		
	}

	const handleCarouselClick = (move) => {
		if (cState >= 1 && cState <= Math.min(10, videos.results.length)) {
			var CC = document.querySelector('.carousel-container')
			const { innerWidth: width } = window
			var val = (((width * 0.4) - 280) * 0.5) + 560
			CC.style.transform = `translateX(${(move * val) + cT}px)`
			setTransform((val * move) + cT)
			setCState(cState + (move * -1))
			checkCState(cState + (move * -1))
		}
	}

	const checkCState = (n) => {
		var limit = Math.min(10, videos.results.length)
		var s_btn_prev = document.querySelector('.swiper-button-prev.csl')
		var s_btn_next = document.querySelector('.swiper-button-next.csl')
		if (n === 1) {
			s_btn_prev.classList.add('no-show')
			s_btn_next.classList.remove('no-show')
		}

		else if (n === limit) {
			s_btn_prev.classList.remove('no-show')
			s_btn_next.classList.add('no-show')
		}

		else if (n > 1 && n < limit) {
			s_btn_prev.classList.remove('no-show')
			s_btn_next.classList.remove('no-show')
		}
	}


	return (
		<>
			<h2 className='lime-headings'>Related Videos</h2>
			
			<div className='carousel v-c'>
				<div className='swiper-button-prev csl'
					onClick={() => handleCarouselClick(1)}></div>
				<div className='carousel-container'>
					{videos.results.slice(0, Math.min(10, videos.results.length)).map((video, index) => (
						<div className='iframe-body' key={index}>
							<iframe width="560" height="315" 
								src={"https://www.youtube.com/embed/" + video.key} 
								title={video.name} 
								frameborder="0" 
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
								allowfullscreen>
							</iframe>
						</div>
					))}
				</div>
				<div className='swiper-button-next csl'
					onClick={() => handleCarouselClick(-1)}></div>
			</div>
        </>
	)
}

export default Videos;


// const SwiperStyling = (n) => {
	// 	var s_btn_prev = document.querySelector('.swiper-button-prev')
	// 	var s_btn_next = document.querySelector('.swiper-button-next')
	// 	if (n <= 1) {
	// 		s_btn_prev.style.display = s_btn_next.style.display = 'none'

	// 	} else {
	// 		s_btn_prev.style.display = s_btn_next.style.display = 'flex'
	// 	}
	// }


// {false && <Swiper slidesPerView={Math.min(1, videos.results.length)} 
// 	spaceBetween={60} 
// 	loop={false} 
// 	navigation={true} 
// 	parallax={true}
// 	Autoplay={true}
// 	className="mySwiper"
// 	style={{ width: videos.results.length > 2 ? '80vw' : '560px' }}>
// 	{videos.results.slice(0, Math.min(9, videos.results.length)).map((video, index) => (
// 		<SwiperSlide key={index} >
// 			<div className='iframe-container'>
//     			<iframe width="560" height="315" 
//     				src={"https://www.youtube.com/embed/" + video.key} 
//     				title={video.name} 
//     				frameborder="0" 
//     				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//     				allowfullscreen>
//     			</iframe>
// 			</div>
// 		</SwiperSlide>
// 	))}	
// </Swiper>}


{/*<div className='iframe-body' key={index}>
	<iframe width="560" height="315" 
		src={"https://www.youtube.com/embed/" + video.key} 
		title={video.name} 
		frameborder="0" 
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
		allowfullscreen>
	</iframe>
</div>*/}



{/*<Swiper slidesPerView={"auto"} 
	spaceBetween={30} 
	loop={false} 
	navigation={true} 
	centeredSlides={true}
	className="mySwiper">
	{videos.results.slice(0, Math.min(10, videos.results.length)).map((video, index) => (
		<SwiperSlide key={index} >
			<iframe width="560" height="315" 
				src={"https://www.youtube.com/embed/" + video.key} 
				title={video.name} 
				frameborder="0" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				allowfullscreen>
			</iframe>
		</SwiperSlide>
	))}
</Swiper>*/}