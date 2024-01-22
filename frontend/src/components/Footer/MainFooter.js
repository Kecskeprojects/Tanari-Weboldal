import { faHouse } from '@fortawesome/free-solid-svg-icons';
import '../../css/Footer.css';
import FooterLinkRow from './FooterLinkRow';

export default function MainFooter() {
	return (
		<footer>
			<ul className='nav justify-content-center border-bottom'>
				<FooterLinkRow
					itemList={[
						{ title: 'Home', url: '/', icon: faHouse },
						{ title: 'Features', url: '/', icon: faHouse },
						{ title: 'Pricing', url: '/', icon: faHouse },
						{ title: 'FAQs', url: '/', icon: faHouse },
						{ title: 'About', url: '/', icon: faHouse },
					]}
				/>
			</ul>
			<p>Látogatások száma: 0</p>
		</footer>
	);
	//Todo: Add a visitor counter and a backend logic, and another table to count visitors, by ip or device? db request counts entries
}
