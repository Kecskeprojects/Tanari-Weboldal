import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DeleteIcon({
	onDeleteFunction = () => {},
	afterDeleteFunction = () => {},
	show = true,
	className = '',
}) {
	function onDelete() {
		if (window.confirm('Biztosan törölni szeretnéd?')) {
			onDeleteFunction().then((result) => {
				afterDeleteFunction(result);
			});
		}
	}

	return show ? (
		<span
			className={'delete-icon text-danger ' + className}
			onClick={onDelete}
		>
			<FontAwesomeIcon icon={faTrash} />
		</span>
	) : null;
}
