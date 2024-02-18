import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { UserContext } from '../../Contexts';
import fileService from '../../Services/fileService';
import DeleteIcon from '../DeleteIcon';

export default function FileContainer({
	file = { FileId: 0, Name: 'unknown', Extension: 'txt' },
	refresh = () => {},
	showDelete = true,
	className = '',
}) {
	const [loading, setLoading] = useState(false);

	const context = useContext(UserContext);

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
			setLoading(false);
		});
		setLoading(true);
	}

	return (
		<div className={'file-container ' + className}>
			{showDelete ? (
				<DeleteIcon
					onDeleteFunction={() =>
						fileService.Remove(file.FileId, context.userData.token)
					}
					afterDeleteFunction={refresh}
					show={context.userData.isLoggedIn()}
				/>
			) : null}
			<div
				onClick={(e) =>
					onDownload(e, file.FileId, file.Name, file.Extension)
				}
			>
				<div className='file-icon'>
					{loading ? (
						<FontAwesomeIcon
							icon={faCircleNotch}
							spin={true}
							fontSize={40}
						/>
					) : (
						<FileIcon
							extension={file.Extension}
							{...defaultStyles[file.Extension]}
						/>
					)}
				</div>
				<span className='container-label'>
					{file.Name}.{file.Extension}
				</span>
			</div>
		</div>
	);
}
