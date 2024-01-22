import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FooterLinkRow({
	itemList = [{ title: 'home', url: '/', icon: null }],
}) {
	return itemList.map((item, index) => {
		return (
			<li key={item.title + index}>
				<a
					href={item.url}
					className='nav-link px-1 mx-1 text-dark'
					title={item.title}
				>
					<FontAwesomeIcon icon={item.icon} />
				</a>
			</li>
		);
	});
}
