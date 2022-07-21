const Modal = ({ children, activeModal, setActiveModal }) => {
	const status = ['modalWrapper']
	if (activeModal) {
		status.push('activeModal')
	}
	return (
		<div className={status.join(' ')} onClick={() => setActiveModal(false)}>
			<div onClick={e => e.stopPropagation()} className='modal'>
				{' '}
				{children}
			</div>
		</div>
	)
}

export default Modal
