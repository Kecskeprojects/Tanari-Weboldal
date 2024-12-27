import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { SearchContext } from '../../Contexts';

export default function SearchComponent() {
	const [currentTimeout, setCurrentTimeout] = useState(0);
	const context = useContext(SearchContext);

	const handleEnter = (e) => {
		//13 is the key code for Enter
		if (e.keyCode === 13) {
			startSearch();
		}
	};

	function startSearchTimeout(e) {
		if (currentTimeout != 0) {
			clearTimeout(currentTimeout);
		}

		const timeoutId = setTimeout(() => {
			updateSearchKeyword(e.target.value);
		}, 2000);

		setCurrentTimeout(timeoutId);
	}

	function startSearch() {
		if (currentTimeout != 0) {
			clearTimeout(currentTimeout);
		}

		const search = document.getElementById('search')?.value;
		updateSearchKeyword(search);
	}

	function updateSearchKeyword(keyword) {
		if (process.env.NODE_ENV !== 'production') {
			console.log('search: ' + keyword);
		}
		context.setSearchKeyword(keyword);
	}

	return (
		<div className='search-container'>
			<label
				htmlFor='search'
				hidden={true}
			>
				Search
			</label>
			<input
				className='search-input'
				name='search'
				id='search'
				placeholder='Keresés...'
				onChange={startSearchTimeout}
				onKeyUp={(e) => handleEnter(e)}
			/>
			<FontAwesomeIcon
				className='search-icon'
				icon={faMagnifyingGlass}
				size='xl'
				onClick={startSearch}
			/>
		</div>
	);
}
