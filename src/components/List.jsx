import React from 'react';
import audioData from '@/assets/common/audioData';

const List = () => {
	const { Original, NewLeaf, CityFolk } = audioData;

	const Display = (obj) => {
		let body = [];
		let children = [];
		Object.keys(obj).map((playlist) => {
			if (
				playlist === 'Normal' ||
				playlist === 'Raining' ||
				playlist === 'Winter' ||
				playlist === 'City'
			) {
				for (let song in obj[playlist]) {
					let link = String(obj[playlist][song]).replace(/dl=0/i, 'dl=1');
					children.push(
						<option value={link} key={link}>
							{song}
						</option>,
					);
				}

				body.push(
					<div className='downloads_list' key={playlist}>
						<h5>{playlist}</h5>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								return window.open(event.target[0].value);
							}}
						>
							<select name='Downloads'>{[...children]}</select>
							<input type='submit' value='Download'></input>
						</form>
					</div>,
				);
				children = [];
			}
			return body;
		});
		return body;
	};
	// eslint-disable-next-line
	const OriginalList = Display(Original);
	// eslint-disable-next-line
	const NewLeafList = Display(NewLeaf);
	// eslint-disable-next-line
	const CityFolkList = Display(CityFolk);
	return (
		<ol className='downloads'>
			<li>List of Music</li>
			<li className='downloads_album'>
				<h4 className='downloads_title'>Animal Crossing</h4>
				{OriginalList}
			</li>
			<li className='downloads_album'>
				<h4 className='downloads_title'>Animal Crossing: New Leaf</h4>
				{NewLeafList}
			</li>
			<li className='downloads_album'>
				<h4 className='downloads_title'>Animal Crossing: City Folk</h4>
				{CityFolkList}
			</li>
		</ol>
	);
};

export default List;
