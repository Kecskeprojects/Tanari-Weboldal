import '../css/Footer.css';

export default function MainFooter() {
	return (
		<footer>
			<ul className='nav justify-content-center border-bottom'>
				<li>
					<a
						href='/'
						className='nav-link px-2'
					>
						Home
					</a>
				</li>
				<li>
					<a
						href='/'
						className='nav-link px-2'
					>
						Features
					</a>
				</li>
				<li>
					<a
						href='/'
						className='nav-link px-2'
					>
						Pricing
					</a>
				</li>
				<li>
					<a
						href='/'
						className='nav-link px-2'
					>
						FAQs
					</a>
				</li>
				<li>
					<a
						href='/'
						className='nav-link px-2'
					>
						About
					</a>
				</li>
			</ul>
			<p>© 2022 Company, Inc</p>
			{/*Todo: Replace with contact icons (gmail, facebook, etc.)(email opens up email app)*/}
		</footer>
	);
	//Todo: Add a visitor counter and a backend logic, and another table to count visitors, by ip or device? db request counts entries
}
