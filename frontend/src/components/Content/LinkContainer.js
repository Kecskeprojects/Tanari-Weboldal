import { useContext } from 'react';
import { UserContext } from '../../Contexts';
import LinkData from '../../Models/LinkData';
import linkService from '../../Services/linkService';
import DeleteIcon from '../DeleteIcon';

export default function LinkContainer({
	link = new LinkData(),
	refresh = () => {},
	showDelete = true,
	className = '',
}) {
	const context = useContext(UserContext);
	return (
		<div className={'link-container ' + className}>
			{showDelete ? (
				<DeleteIcon
					onDeleteFunction={() =>
						linkService.Remove(link.LinkId, context.userData.token)
					}
					afterDeleteFunction={refresh}
					show={context.userData.isLoggedIn()}
				/>
			) : null}
			<a
				href={link.Url}
				target={link.OpenNewTab === true ? '_blank' : '_self'}
				rel='noreferrer'
				className='container-label'
			>
				{link.Title}
			</a>
		</div>
	);
}
