import styles from './Button.module.css'

const Button = ({ children, view, ...props }) => {
	return (
		<button
			{...props}
			className={view === 'orange' ? `${styles.orange}` : `${styles.white}`}
		>
			{children}
		</button>
	)
}

export default Button
