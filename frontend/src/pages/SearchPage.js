import { useContext, useEffect, useState } from 'react';
import FileContainer from '../components/Content/FileContainer';
import LinkContainer from '../components/Content/LinkContainer';
import { SearchContext } from '../Contexts';
import '../css/DetailPage.css';
import FileData from '../Models/FileData';
import LinkData from '../Models/LinkData';
import fileService from '../Services/fileService';
import linkService from '../Services/linkService';

export default function SearchPage() {
	const [files, setFiles] = useState([new FileData()].filter((x) => false));
	const [links, setLinks] = useState([new LinkData()].filter((x) => false));
	const context = useContext(SearchContext);

	useEffect(() => {
		fileService
			.GetBySearchResult(context.searchKeyword) /*No loading*/
			.then((files) => {
				setFiles(files);
			});
		linkService
			.GetBySearchResult(context.searchKeyword) /*No loading*/
			.then((links) => {
				setLinks(links);
			});
	}, [context.searchKeyword]);

	return (
		<div>
			<div>Találatok a '{context.searchKeyword}' kulcsszóra:</div>
			{links && links.length > 0 ? (
				<>
					<div className='content-header'>Linkek:</div>
					<div className='overflow-hidden w-100'>
						{links.map((link, index) => (
							<LinkContainer
								link={link}
								showDelete={false}
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
								showDelete={false}
								key={'file' + index}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}
