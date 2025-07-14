import { type FormEvent, type JSX } from 'react';
import audioData from '@/assets/common/audioData';

const List = () => {
	const { Original, NewLeaf, CityFolk } = audioData;
	function submit(event: FormEvent) {
		event.preventDefault();
		const $el: Element | undefined = [...event.currentTarget.children].find(
			({ localName }) => localName === 'select',
		);
		if ($el) window.open(($el as HTMLSelectElement)?.value);
	}

	const Display = (obj: string | number | object) => {
		const body: JSX.Element[] = [];
		Object.keys(obj).map((playlist) => {
			if (
				playlist === 'Normal' ||
				playlist === 'Raining' ||
				playlist === 'Winter' ||
				playlist === 'City'
			) {
				body.push(
					<div className='downloads_list' key={playlist}>
						<h5>{playlist}</h5>
						<form onSubmit={submit}>
							<select name='Downloads'>
								{Object.keys(obj[playlist as keyof object]).map((song: string) => {
									const link = String(obj[playlist as keyof object][song]).replace(/dl=0/i, 'dl=1');
									return (
										<option value={link} key={link}>
											{song}
										</option>
									);
								})}
							</select>
							<input type='submit' value='Download'></input>
						</form>
					</div>,
				);
			}
			return body;
		});
		return body;
	};

	const OriginalList = Display(Original);

	const NewLeafList = Display(NewLeaf);

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
