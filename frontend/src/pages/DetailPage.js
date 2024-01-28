import { useState, useEffect, useContext } from 'react';
import '../css/DetailPage.css';
import fileService from '../Services/fileService';
import linkService from '../Services/linkService';
import FileContainer from '../components/Content/FileContainer';
import PopupBase from '../components/PopupBase';
import LinkContainer from '../components/Content/LinkContainer';
import { LocationContext, UserContext } from '../Contexts';
import FilePopupDetail from '../components/Content/FilePopupDetail';
import LinkPopupDetail from '../components/Content/LinkPopupDetail';
import PopupTypeEnum from '../enum/PopupTypeEnum';
import Button from '../components/Button';

export default function DetailPage() {
	const [files, setFiles] = useState([]);
	const [links, setLinks] = useState([]);
	const [panel, setPanel] = useState(PopupTypeEnum.None);

	const context = useContext(LocationContext);
	const userContext = useContext(UserContext);

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

	function linkOnSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		data.append('navName', context.locationData.location);
		linkService.Create(data, userContext.userData.token).then((result) => {
			refresh();
			console.log(result);
		});
	}

	function fileOnSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		data.append('navName', context.locationData.location);
		fileService.Create(data, userContext.userData.token).then((result) => {
			refresh();
			console.log(result);
		});
	}

	function renderPopups() {
		switch (panel) {
			case PopupTypeEnum.CreateFile: {
				return (
					<PopupBase
						popupDetail={FilePopupDetail}
						onSubmitFunction={fileOnSubmit}
						onCancel={() => setPanel(PopupTypeEnum.None)}
					/>
				);
			}
			case PopupTypeEnum.CreateLink: {
				return (
					<PopupBase
						popupDetail={LinkPopupDetail}
						onSubmitFunction={linkOnSubmit}
						onCancel={() => setPanel(PopupTypeEnum.None)}
					/>
				);
			}
			default:
				return null;
		}
	}

	function renderButtons() {
		return (
			<>
				<Button
					label='Fájl Hozzáadás'
					onClickFunction={() => setPanel(PopupTypeEnum.CreateFile)}
				/>
				<Button
					label='Link Hozzáadás'
					onClickFunction={() => setPanel(PopupTypeEnum.CreateLink)}
				/>
			</>
		);
	}

	return (
		<div className='content-container'>
			{renderPopups()}
			{renderButtons()}
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
