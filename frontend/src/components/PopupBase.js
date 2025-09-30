import { faCircleNotch, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function PopupBase({
	popupDetail = {
		title: null,
		description: null,
		inputs: [
			{
				name: 'test',
				type: 'text',
				label: 'test label',
				description: 'test description',
			},
		],
	},
	onSubmitFunction = (e) => {},
	onCancel = (e) => {},
}) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function handleKeyDown(e) {
			if (process.env.NODE_ENV !== 'production') {
				console.log(e.keyCode);
			}

			//27 is the key code for Escape
			if (e.keyCode === 27) {
				onCancel(e);
			}
		}

		document.addEventListener('keydown', handleKeyDown);

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

	function renderInput(input, ind) {
		return (
			<div
				key={input.name + ind}
				className='input-base'
			>
				{input.label ? (
					<label
						className='form-label'
						htmlFor={input.name}
					>
						{input.label}:
					</label>
				) : null}
				<input
					id={input.name}
					type={input.type}
					className='form-input'
					aria-label={input.label ? input.label : input.name}
					title={input.label ? input.label : input.name}
					name={input.name}
				/>
				{input.description ? (
					<div
						className='form-description'
						dangerouslySetInnerHTML={{ __html: input.description }}
					/>
				) : null}
			</div>
		);
	}

	function onSubmit(e) {
		onSubmitFunction(e);
		setLoading(true);
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
					{popupDetail.description ? (
						<h6 className='mb-4'>{popupDetail.description}</h6>
					) : null}
					<span
						className={'delete-icon m-2 h5'}
						onClick={onCancel}
					>
						<FontAwesomeIcon icon={faX} />
					</span>
					<form onSubmit={onSubmit}>
						{popupDetail.inputs &&
							popupDetail.inputs.map((input, ind) =>
								renderInput(input, ind)
							)}
						{loading ? (
							<FontAwesomeIcon
								icon={faCircleNotch}
								spin={true}
								fontSize={30}
							/>
						) : (
							<button
								className='mt-4	'
								type='submit'
								key={popupDetail.buttonLabel}
							>
								{popupDetail.buttonLabel}
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
