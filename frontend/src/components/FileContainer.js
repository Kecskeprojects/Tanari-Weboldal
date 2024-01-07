import { FileIcon, defaultStyles } from 'react-file-icon';
import fileService from '../Services/fileService';

export default function FileContainer({
	file = { FileId: 0, Name: 'unknown', Extension: 'txt' },
}) {
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

	//Todo: Add a delete icon on the top right corner that deletes file from db
	return (
		<div
			className='file-container'
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
	);
}
