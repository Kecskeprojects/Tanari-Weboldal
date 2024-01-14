import { FileIcon, defaultStyles } from 'react-file-icon';
import fileService from '../Services/fileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function FileContainer({
	file = { FileId: 0, Name: 'unknown', Extension: 'txt' },
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

	function onDelete() {
		if (window.confirm('Biztosan törölni szeretnéd?')) {
			alert('törölve');
		} else {
			alert('visszavonva');
		}
	}

	//Todo: Add a delete icon on the top right corner that deletes file from db
	return (
		<div className='file-container'>
			<span
				className='delete-icon text-danger'
				onClick={onDelete}
			>
				<FontAwesomeIcon icon={faTrash} />
			</span>
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
