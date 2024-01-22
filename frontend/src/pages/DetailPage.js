import { useState, useEffect, useContext } from 'react';
import '../css/DetailPage.css';
import fileService from '../Services/fileService';
import linkService from '../Services/linkService';
import FileContainer from '../components/Content/FileContainer';
// import PopupBase from '../components/PopupBase';
import LinkContainer from '../components/Content/LinkContainer';
import { LocationContext } from '../Contexts';

export default function DetailPage() {
	const [files, setFiles] = useState([]);
	const [links, setLinks] = useState([]);

	const context = useContext(LocationContext);

	useEffect(() => {
		if (context.locationData?.Url) {
			fileService.GetAll(context.locationData.NavId).then((files) => {
				setFiles(files);
			});

			linkService.GetAll(context.locationData.NavId).then((links) => {
				setLinks(links);
			});
		}
	}, [context]);

	function refresh() {
		context.setLocationData({ ...context.locationData });
	}

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
			{/*Todo: Make popups for the add logics*/}
			{/*Todo: Add buttons for popups instead of constantly being there, The buttons should also only appear in case the user is logged in*/}
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
