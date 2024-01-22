import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import linkService from '../Services/linkService';

export default function LinkContainer({
	link = { LinkId: 0, Url: 'unknown', Title: 'txt' },
	userData = {},
	refresh = () => {},
}) {
	function onDelete() {
		if (window.confirm('Biztosan törölni szeretnéd?')) {
			linkService.Remove(link.LinkId, userData.token).then((result) => {
				refresh();
				console.log(result);
			});
		}
	}

	//Todo: Put delete icon into separate component, it should only appear when logged in
	return (
		<div className='link-container'>
			<a href={link.Url}>{link.Title}</a>
			<span
				className='delete-icon text-danger'
				onClick={onDelete}
			>
				<FontAwesomeIcon icon={faTrash} />
			</span>
		</div>
	);
}
