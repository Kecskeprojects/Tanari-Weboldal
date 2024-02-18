import { faCircleNotch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function DeleteIcon({
	onDeleteFunction = () => {},
	afterDeleteFunction = () => {},
	show = true,
	className = '',
}) {
	const [loading, setLoading] = useState(false);

	function onDelete() {
		if (window.confirm('Biztosan törölni szeretnéd?')) {
			onDeleteFunction().then((result) => {
				afterDeleteFunction(result);
				setLoading(false);
			});
			setLoading(true);
		}
	}

	return show ? (
		<span
			className={'delete-icon text-danger ' + className}
			onClick={onDelete}
		>
			{loading ? (
				<FontAwesomeIcon
					icon={faCircleNotch}
					spin={true}
				/>
			) : (
				<FontAwesomeIcon icon={faTrash} />
			)}
		</span>
	) : null;
}
