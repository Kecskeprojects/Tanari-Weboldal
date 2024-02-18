import { useEffect, useState } from 'react';
import fileService from '../Services/fileService';
import linkService from '../Services/linkService';
import FileContainer from '../components/Content/FileContainer';
import LinkContainer from '../components/Content/LinkContainer';
import '../css/HomePage.css';

export default function HomePage() {
	const [files, setFiles] = useState([]);
	const [links, setLinks] = useState([]);

	useEffect(() => {
		fileService
			.GetRecent() /*No loading*/
			.then((files) => {
				setFiles(files);
			});

		linkService
			.GetRecent() /*No loading*/
			.then((links) => {
				setLinks(links);
			});
	}, []);

	return (
		<div className='vertical-list'>
			{links && links.length > 0 ? (
				<>
					<div>Legújabb linkek:</div>
					<div className='overflow-hidden'>
						{links.map((link, index) => (
							<LinkContainer
								link={link}
								showDelete={false}
								key={'link' + index}
								className='float-right'
							/>
						))}
					</div>
				</>
			) : null}
			{files && files.length > 0 ? (
				<>
					<div>Legújabb fájlok:</div>
					<div className='overflow-hidden'>
						{files.map((file, index) => (
							<FileContainer
								file={file}
								showDelete={false}
								key={'file' + index}
								className='float-right'
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}
