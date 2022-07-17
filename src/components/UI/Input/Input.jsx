import styles from './Input.module.css'

const Input = ({ placeholder, ...props }) => {
	return <input {...props} className={styles.input} placeholder={placeholder} />
}

export default Input
