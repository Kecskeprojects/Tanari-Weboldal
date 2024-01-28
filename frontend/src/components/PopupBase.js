import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function PopupBase({
	popupDetail = {
		title: null,
		inputs: [{ name: 'test', type: 'text', label: 'test label' }],
	},
	onSubmitFunction = (e) => {},
	onCancel = (e) => {},
}) {
	useEffect(() => {
		function handleKeyDown(e) {
			//console.log(e.keyCode);
			//27 is the key code for Escape
			if (e.keyCode === 27) {
				onCancel(e);
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		// Don't forget to clean up
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onCancel]);

	function onClickOutside(e) {
		const elements = document.getElementsByClassName('popup-base');
		if (!elements[elements.length - 1].contains(e.target)) {
			onCancel(e);
		}
	}

	function renderInput(input) {
		return (
			<input
				id={input.name}
				type={input.type}
				className='form-input'
				aria-label={input.label ? input.label : input.name}
				title={input.label ? input.label : input.name}
				name={input.name}
			/>
		);
	}

	return (
		<div
			className='gray-cover'
			onClick={onClickOutside}
		>
			<div className='popup-base'>
				<div className='px-4 py-3 position-relative'>
					{popupDetail.title ? (
						<h2 className='mb-4'>{popupDetail.title}</h2>
					) : null}
					<span
						className={'delete-icon m-2 h5'}
						onClick={onCancel}
					>
						<FontAwesomeIcon icon={faX} />
					</span>
					<form onSubmit={onSubmitFunction}>
						{popupDetail.inputs &&
							popupDetail.inputs.map((input, ind) => {
								return (
									<div key={input.name + ind}>
										{input.label ? (
											<label
												className='form-label'
												htmlFor={input.name}
											>
												{input.label}:
											</label>
										) : null}
										{renderInput(input)}
									</div>
								);
							})}
						<button
							className='mt-4	'
							type='submit'
							key={popupDetail.buttonLabel}
						>
							{popupDetail.buttonLabel}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
