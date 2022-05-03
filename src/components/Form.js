import React, { Component } from 'react';
import Select from 'react-select';


const formSelectOptions = [
	{ value: 'multi', label: 'All' },
	{ value: 'movie', label: 'Movies' },
	{ value: 'tv', label: 'Tv' },
	{ value: 'person', label: 'Actors' }
];

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			filterValue: 'multi',
			selectWidth: '36px',
			formSelectStyles: {
				control: (styles, {isFocused, isSelected}) => { 
					return {
						...styles, 
						backgroundColor: '#282828', 
						border: 'none',
						flexWrap: 'nowrap',
						borderRadius: '4px 0px 0px 4px',
						boxShadow: isFocused && '0 0 0 0 transparent',
						transition: 'background-color 0.45s ease-in-out',
						':hover': {
							backgroundColor: '#000',

						},
					};
				}, 
				option: (styles, { data, isDisabled, isFocused, isSelected }) => {
				    return {
				    	...styles,
				    	color: isSelected 
				    		? '#fbff00'
				    		: 'white',
				    	backgroundColor: 'black',
				    	fontSize: '1.15rem',
				    	cursor: 'pointer',
				    	':hover': {
				    		backgroundColor: '#202020',
				    	},
			    	};
				},
				input: styles => ({ ...styles, border: 'none' }),
				singleValue: styles => ({ ...styles, color: 'white' }),
				menu: styles => ({ ...styles, 
					backgroundColor: '#000000', 
					width: '200px',  
				}),
				menuList: styles => ({ ...styles, paddingTop: '0px', paddingBottom: '0px', borderRadius: '4px' }),
				indicatorsContainer: styles => ({ ...styles, color: 'white', minWidth: '36px' }),
				indicatorSeparator: styles => ({ ...styles, width: '0px' }),
				valueContainer: styles => ({ ...styles, minWidth: '36px', width: this.state.selectWidth })
			},
		};
	}

	handleSelectChange = (e) => {
		this.setState({
			filterValue: e.value,
			selectWidth: ((e.label.length + 1) * 8 + 10) + 'px',
		})
	}

	handleInputChange = (e) => {
		this.setState({ inputValue: e.target.value })
	}

	handleInputClick = (e) => {
		if (e.which === 13)
			this.props.onSubmit(this.state.inputValue, this.state.filterValue)
	}

	render() {
		return (
			<form className='form' onSubmit={(e) => e.preventDefault()}>
				<Select
					defaultValue={formSelectOptions[0]} 
					options={formSelectOptions} 
					styles={this.state.formSelectStyles}
					// onChange={(e) => console.log(e)}
					onChange={this.handleSelectChange}
					isSearchable={false} />
				<input 
					className='form-control' 
					autoComplete='off' 
					placeholder='Search your favorite content' 
					value={this.state.inputValue}
					onChange={this.handleInputChange}
					onKeyPress={this.handleInputClick}
				/>
				<button 
					className='btn btn-default'
					type='button'
					onClick={() => this.props.onSubmit(this.state.inputValue, this.state.filterValue)}
					>
					<svg height="20" role="img" width="20" viewBox="0 0 512 512" className="_08f8133e4f703ce562826348eb158f87-scss" aria-hidden="true">
						<path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor"></path>
					</svg>
				</button>
			</form>
		);
	}
}


export default Form;