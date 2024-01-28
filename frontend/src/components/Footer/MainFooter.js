import { faHouse } from '@fortawesome/free-solid-svg-icons';
import '../../css/Footer.css';
import FooterLinkRow from './FooterLinkRow';
import { useEffect, useState } from 'react';
import visitService from '../../Services/visitService';

export default function MainFooter() {
	const [visitCount, setVisitCount] = useState(0n);

	useEffect(() => {
		visitService.GetVisits().then((result) => {
			setVisitCount(result);
		});
	}, []);

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
			<p>Látogatások száma: {visitCount.toString()}</p>
		</footer>
	);
}
