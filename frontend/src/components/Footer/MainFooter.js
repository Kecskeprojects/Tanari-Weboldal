import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import visitService from '../../Services/visitService';
import '../../css/Footer.css';
import FooterLinkRow from './FooterLinkRow';

export default function MainFooter() {
	const [visitCount, setVisitCount] = useState(0n);

	useEffect(() => {
		visitService
			.GetVisits() /*No loading*/
			.then((result) => {
				setVisitCount(result ?? 0);
			});
	}, []);

	return (
		<footer>
			<ul className='nav justify-content-center border-bottom'>
				<FooterLinkRow //Todo: Get the right footer links
					itemList={[
						{ title: 'Home', url: '/', icon: faHouse },
						{ title: 'Home', url: '/', icon: faHouse },
						{ title: 'Home', url: '/', icon: faHouse },
						{ title: 'Home', url: '/', icon: faHouse },
						{ title: 'Home', url: '/', icon: faHouse },
					]}
				/>
			</ul>
			<p>Látogatások száma: {visitCount.toString()}</p>
		</footer>
	);
}
