import { useCallback, useEffect, useState } from 'react';
import '../css/Content.css';
import fileService from '../Services/fileService';
import FileContainer from './FileContainer';

export default function MainContent({
	setNavigationListenersAttached = () => {},
	navigationListenersAttached = false,
	userData,
}) {
	const [locationData, setLocationData] = useState({
		location: window.location.pathname.replace('/', ''),
		locationName: '',
	});
	const [files, setFiles] = useState([]);

	const observeUrlChange = useCallback(
		(e) => {
			const newLocation = window.location.pathname.replace('/', '');
			if (locationData.location !== newLocation) {
				setLocationData({ location: newLocation, locationName: '' });
			}
		},
		[locationData]
	);

	useEffect(() => {
		if (!navigationListenersAttached) {
			//Removing to avoid duplication, in the rare case that it may occur
			document.removeEventListener('onpushstate', onNavigation);
			document.addEventListener('onpushstate', onNavigation);

			window.removeEventListener('popstate', observeUrlChange);
			window.addEventListener('popstate', observeUrlChange);
			setNavigationListenersAttached(true);
		}

		if (locationData.location) {
			fileService
				.GetAll(locationData.location)
				.then((res) => res.json())
				.then((files) => {
					//console.log(files);
					setFiles(files[0]);
				})
				.catch((error) => console.log(error));
		}
	}, [
		navigationListenersAttached,
		setNavigationListenersAttached,
		observeUrlChange,
		locationData,
	]);

	function onNavigation(e) {
		//console.log(e.detail);
		setLocationData({
			location: e.detail.url,
			locationName: e.detail.title,
		});
	}

	function onSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		data.append('navName', locationData.location);
		fileService
			.Create(data, userData.token)
			.then(() => {
				setLocationData({ ...locationData });
			})
			.catch((error) => console.log(error));
	}

	//Todo: Split into HomePage and NavigatePage, which one will be rendered depends on if the location is empty/no files and links were retrived
	//Todo: Home page should contain a list on it's right/left side with a list of newly uploaded links/files
	//Todo: NavigatePage will contain two lists, one for links, one for files, in this order
	return (
		<div className='content-container'>
			<div className='file-upload-container'>
				<form onSubmit={onSubmit}>
					<input
						name='file'
						type='file'
					/>
					<br />
					<button type='submit'>Fájl Feltöltés</button>
				</form>
			</div>
			<span>
				This page's content, location: {locationData.location}, Name:{' '}
				{locationData.locationName}
			</span>
			<br />
			<br />
			<div>
				{files.map((file, index) => (
					<FileContainer
						file={file}
						key={'file' + index}
					/>
				))}
			</div>
		</div>
	);
}
