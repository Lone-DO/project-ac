import { Component, type JSX } from 'react';

import Info from './Info';
import List from './List';

interface iState {
	listShowing: boolean;
	infoShowing: boolean;
	display: JSX.Element[];
}

class Footer extends Component {
	constructor(props: object) {
		super(props);
		this.state = {
			listShowing: false,
			infoShowing: false,
			display: [],
		} as iState;

		this.toggleDisplay = this.toggleDisplay.bind(this);
	}

	toggleDisplay(item: string, content: JSX.Element | null = null) {
		this.setState((prevState: iState) => {
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
		const listBtn = (this.state as iState).listShowing ? (
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
				onClick={() => this.toggleDisplay('listShowing', <List />)}
			>
				Downloads
			</button>
		);

		const infoBtn = (this.state as iState).infoShowing ? (
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
				onClick={() => this.toggleDisplay('infoShowing', <Info />)}
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
				{(this.state as iState).display}
			</footer>
		);
	}
}

export default Footer;
