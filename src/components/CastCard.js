import { useState, useEffect } from 'react';


const _baseImgUrl = 'https://image.tmdb.org/t/p/'
// const baseWebUrl = 'https://api.themoviedb.org/3';
// const API_KEY = '?api_key=6cab8f1bc6c79b46b07caa568a62bd8d';

const Cast = ({ details, totalCast }) => {
	const [detail, setDts] = useState({
		name: null,
		char: null,
		pp: null,
		bio: null,
		akf: null,
		ppb: false,
	})

	useEffect(() => {
		(async () => {

			if (details != null 
				&& details.person_info != null
				&& details.credit_info != null) {
				setDts({
					name: details.person_info.name,
					char: details.credit_info.media.character, 
					pp: _baseImgUrl + 'w500' + details.person_info.profile_path,
					bio: details.person_info.biography,
					akf: details.credit_info.person.known_for,
					ppb: details.person_info.profile_path != null ? true : false,
				})
				console.log('done')
			} 

		})()
	}, [details])

	// const getCreditInfo = async (c_id, p_id) => {
	// 	const result_c = await fetch(
	// 		baseWebUrl + '/credit/'
	// 		+ c_id + API_KEY
	// 	)

	// 	const creditDeets = await result_c.json()
	// 	console.log(creditDeets)

	// 	const result_p = await fetch(
	// 		baseWebUrl + '/person/'
	// 		+ p_id + API_KEY
	// 	)

	// 	const personDeets = await result_p.json()
	// 	console.log(personDeets)

		
	// 	setDts({ 
	// 		deet_1: creditDeets, 
	// 		deet_2: personDeets,
	// 	})
		
		

	// 	// return 'done'
	// }


	return (
		<div className='credit-info-container'
			style={{ maxHeight: totalCast < 7 ? '540px' : '820px' }} >
			<div className='credit-name'>{detail.name}</div>
			<div className='credit-char'>{detail.char}</div>
			<div className='credit-img-container'>
				{detail.ppb && <img
					src={detail.pp} 
					alt={detail.name}
					height='240px'
					width='160px'
				/>}
			</div>
			<div className='credit-bio'>{detail.bio}</div>
			{detail.akf && <div className='credit-also-known-for'>
				<h3 style={{ 
					fontFamily: 'C Font6', 
					marginTop: '20px',
					marginBottom: '20px',
				}}>Widely Known For</h3>
				<div className='credit-movies'>
					{detail.akf.map((movie, index) => (
						movie.poster_path != null ? (<div style={{
							maxWidth: '120px',
							margin: '12px',
						}}>
							<img height='180px' width='120px'
								src={_baseImgUrl + 'w400' + movie.poster_path} />
							<div style={{ 
								fontFamily: 'C Font8', 
								marginTop: '5px',
							}}>{movie.title || movie.name || ''}</div>
						</div>)
						: (<h4 key={index} className='credit-movie-container'
						style={{ 
							maxWidth: '120px', 
							margin: '12px', 
							fontFamily: 'Dancing Script' 
						}}>
							{movie.title || movie.name || ''}
						</h4>)
					))}
				</div>
			</div>}
		</div>
	)
}

export default Cast;