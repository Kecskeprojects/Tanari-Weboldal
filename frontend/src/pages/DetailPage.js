import { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import FileContainer from '../components/Content/FileContainer';
import FilePopupDetail from '../components/Content/FilePopupDetail';
import LinkContainer from '../components/Content/LinkContainer';
import LinkPopupDetail from '../components/Content/LinkPopupDetail';
import PopupBase from '../components/PopupBase';
import { LocationContext, UserContext } from '../Contexts';
import '../css/DetailPage.css';
import PopupTypeEnum from '../Enum/PopupTypeEnum';
import FileData from '../Models/FileData';
import LinkData from '../Models/LinkData';
import fileService from '../Services/fileService';
import linkService from '../Services/linkService';

export default function DetailPage() {
	const [files, setFiles] = useState([new FileData()].filter((x) => false));
	const [links, setLinks] = useState([new LinkData()].filter((x) => false));
	const [panel, setPanel] = useState(PopupTypeEnum.None);

	const context = useContext(LocationContext);
	const userContext = useContext(UserContext);

	useEffect(() => {
		if (context.locationData?.Url) {
			fileService
				.GetAll(context.locationData.NavId) /*No loading*/
				.then((files) => {
					setFiles(files);
				});

			linkService
				.GetAll(context.locationData.NavId) /*No loading*/
				.then((links) => {
					setLinks(links);
				});
		}
	}, [context]);

	function refresh() {
		context.setLocationData({ ...context.locationData });
		setPanel(PopupTypeEnum.None);
	}

	function linkOnSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		data.append('navId', context.locationData.NavId);
		if (data.has('openNewTab')) {
			data.set('openNewTab', 'true');
		} else {
			data.append('openNewTab', 'false');
		}
		linkService.Create(data, userContext.userData.token).then(refresh);
	}

	function fileOnSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		data.append('navId', context.locationData.NavId);
		fileService.Create(data, userContext.userData.token).then(refresh);
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
		<>
			{renderPopups()}
			{renderButtons()}
			{links && links.length > 0 ? (
				<>
					<div className='content-header'>Linkek:</div>
					<div className='overflow-hidden w-100'>
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
					<div className='overflow-hidden w-100'>
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
		</>
	);
}
