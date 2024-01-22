import { FileIcon, defaultStyles } from 'react-file-icon';
import fileService from '../Services/fileService';
import DeleteIcon from './DeleteIcon';

export default function FileContainer({
	file = { FileId: 0, Name: 'unknown', Extension: 'txt' },
	userData = {},
	refresh = () => {},
}) {
	function onDownload(e, fileId, name, extension) {
		fileService.GetById(fileId).then((blob) => {
			const file = new File([blob], `${name}.${extension}`);
			const url = window.URL.createObjectURL(file);
			const link = document.createElement('a');
			link.setAttribute('download', `${name}.${extension}`);
			link.setAttribute('href', url);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(document.body.lastChild);
		});
	}

	return (
		<div className='file-container'>
			<DeleteIcon
				onDeleteFunction={() =>
					fileService.Remove(file.FileId, userData.token)
				}
				afterDeleteFunction={refresh}
				show={userData.isLoggedIn()}
			/>
			<div
				onClick={(e) =>
					onDownload(e, file.FileId, file.Name, file.Extension)
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
		</div>
	);
}
