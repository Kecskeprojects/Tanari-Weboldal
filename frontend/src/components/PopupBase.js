export default function PopupBase() {
	return (
		<div className='gray-cover'>
			<div className='popup-base'>
				<form>
					<input
						name='file'
						type='file'
					/>
					<br />
					<button type='submit'>Fájl Feltöltés</button>
				</form>
			</div>
		</div>
	);
}
