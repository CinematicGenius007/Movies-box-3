import React, { Component } from 'react';
import QueryCard from './QueryCard.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';



const GlobalCss = withStyles({
	'@global': {
		'.MuiPagination-ul': {
			display: 'flex',
			justifyContent: 'center',
			marginTop: '30px',
			marginBottom: '30px',
		},
		'.MuiPaginationItem-root': {
			color: '#a28bff',
		},
		'.MuiPaginationItem-root:hover': {
			backgroundColor: '#000000',
		},
		'.MuiPaginationItem-sizeLarge': {
			padding: '5px 8px',
			fontSize: '0.985rem',
			height: '40px',
			width: '40px',
			borderRadius: '50px',
		},
		'.MuiPaginationItem-page.Mui-selected': {
			backgroundColor: '#a28bff',
			color: '#000000',
		},
		'.MuiPaginationItem-page.Mui-selected:hover': {
			color: '#ffffff',
		},
		'.MuiPaginationItem-ellipsis': {
			padding: '10px 10px',
		},
	}
})(() => null);


class Main extends Component {
	constructor(props) {
		super(props)
		this.classRoot = makeStyles((theme) => ({
			root: {
				'& > *': {
					marginTop: theme.spacing(2),
				},
			},
		}))
		this.state = {
			page: 1,
		}
	}

	handlePageChange = (event, param) => {
		this.setState({ page: param})
		this.props.onChange(param)
	}

	render() {
		return (
			<main id="main">
				{this.props.dataList.length > 0 && <div className='query-container'>
					{this.props.dataList.map((item, index) => 
						<QueryCard key={index} details={item} onCardClick={this.props.onCardClick} />
					)}
					{this.props.dataList.length === 20 && this.state.page < this.props.pageT
						&& <div key='nextPageCard' className='next-page-card'>
						<div className='nextpage-link' onClick={() => this.handlePageChange('event', this.state.page + 1)}>
							Next
							<div>
								<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
									 viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve">
									<g>
										<g>
											<path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068
												c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557
												l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104
												c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z"/>
										</g>
									</g>
								</svg>
							</div>
						</div>
					</div>}
				</div>}
				{this.props.dataList.length > 0 
					&& 
					<React.Fragment>
						<GlobalCss />
						<div className={this.classRoot.root}>
							<Pagination 
								count={this.props.pageT} 
								page={this.state.page} 
								onChange={this.handlePageChange} 
								size='large'
								defaultPage={6} 
								siblingCount={0} 
							/>
						</div>
					</React.Fragment>
				}
			</main>
		);
	}
}


export default Main;