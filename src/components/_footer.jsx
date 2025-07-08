import React, { Component } from 'react';

import Info from './Info';
import List from './List';

class Footer extends Component {
	constructor() {
		super();
		this.state = {
			listShowing: false,
			infoShowing: false,
			display: [],
		};

		this.toggleDisplay = this.toggleDisplay.bind(this);
	}

	toggleDisplay(item, content = []) {
		this.setState((prevState) => {
			switch (item) {
				case 'listShowing':
					return {
						listShowing: !prevState.listShowing,
						infoShowing: false,
						display: content,
					};
				case 'infoShowing':
					return {
						infoShowing: !prevState.infoShowing,
						listShowing: false,
						display: content,
					};
				default:
					return;
			}
		});
	}

	render() {
		const listBtn = this.state.listShowing ? (
			<button
				key='listHide'
				onClick={() => this.toggleDisplay('listShowing')}
				className='btn cancel-button'
			>
				<i className='material-icons'>eject</i>
			</button>
		) : (
			<button
				key='listShow'
				className='btn'
				onClick={() => this.toggleDisplay('listShowing', <List audioData={this.props.audioData} />)}
			>
				Downloads
			</button>
		);

		const infoBtn = this.state.infoShowing ? (
			<button
				key='infoHide'
				onClick={() => this.toggleDisplay('infoShowing')}
				className='btn cancel-button'
			>
				<i className='material-icons'>eject</i>
			</button>
		) : (
			<button
				key='infoShow'
				className='btn'
				onClick={() => this.toggleDisplay('infoShowing', <Info props={this.props.audioData} />)}
			>
				Info
			</button>
		);

		return (
			<footer>
				<div>
					{infoBtn}
					{listBtn}
				</div>
				{this.state.display}
			</footer>
		);
	}
}

export default Footer;
