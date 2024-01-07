import { useCallback, useEffect, useState } from 'react';
import fileService from '../Services/fileService';
import { FileIcon, defaultStyles } from 'react-file-icon';

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

	function onDownload(e, fileId, name, extension) {
		fileService
			.GetById(fileId)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], `${name}.${extension}`);
				const url = window.URL.createObjectURL(file);
				const link = document.createElement('a');
				link.setAttribute('download', `${name}.${extension}`);
				link.setAttribute('href', url);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(document.body.lastChild);
			})
			.catch((error) => console.log(error));
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
				{files.map((file, index) => {
					return (
						<div
							key={index}
							className='file-container'
							onClick={(e) =>
								onDownload(
									e,
									file.FileId,
									file.Name,
									file.Extension
								)
							}
						>
							<div className='file-icon'>
								<FileIcon
									extension={file.Extension}
									{...defaultStyles[file.Extension]}
								/>
							</div>
							<span>
								{file.Name}.{file.Extension}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
