import { pushStateWithEvent } from '../../Helpers/pushStateHelper';

export default function HomeLink() {
	return (
		<a
			className='main-link ms-4'
			href='/'
			onClick={(e) => pushStateWithEvent(e, null, 'Home', '/')}
		>
			<img
				className='me-2'
				src='https://placehold.co/64'
				alt='profile'
				width='64'
				height='64'
			/>
			Főoldal
		</a>
	);
}
