import { useState, useEffect } from 'react';
import '../css/DetailPage.css';
import fileService from '../Services/fileService';
import linkService from '../Services/linkService';
import FileContainer from '../components/FileContainer';
// import PopupBase from '../components/PopupBase';
import LinkContainer from '../components/LinkContainer';

export default function DetailPage({
	locationData,
	refresh = () => {},
	userData,
}) {
	const [files, setFiles] = useState([]);
	const [links, setLinks] = useState([]);

	useEffect(() => {
		if (locationData.location) {
			fileService.GetAll(locationData.location).then((files) => {
				setFiles(files);
			});

			linkService.GetAll(locationData.location).then((links) => {
				setLinks(links);
			});
		}
	}, [locationData]);

	// function onSubmit(e) {
	// 	e.preventDefault();
	// 	const data = new FormData(e.target);
	// 	data.append('navName', locationData.location);
	// 	fileService.Create(data, userData.token).then((result) => {
	// 		refresh();
	// 		console.log(result);
	// 	});
	// }

	return (
		<div className='content-container'>
			{/*Todo: The buttons should also only appear in case the user is logged in*/}
			{/*Todo: Add buttons for popups instead of constantly being there*/}
			{/* <PopupBase /> */}
			{/* <div className='file-upload-container'>
				<form onSubmit={onSubmit}>
					<input
						name='file'
						type='file'
					/>
					<br />
					<button type='submit'>Fájl Feltöltés</button>
				</form>
			</div> */}
			{links && links.length > 0 ? (
				<>
					<div className='content-header'>Linkek:</div>
					<div className='overflow-hidden'>
						{links.map((link, index) => (
							<LinkContainer
								link={link}
								userData={userData}
								refresh={refresh.bind(this)}
								key={'link' + index}
							/>
						))}
					</div>
				</>
			) : null}
			{files && files.length > 0 ? (
				<>
					<div className='content-header'>Fájlok:</div>
					<div className='overflow-hidden'>
						{files.map((file, index) => (
							<FileContainer
								file={file}
								userData={userData}
								refresh={refresh.bind(this)}
								key={'file' + index}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}
