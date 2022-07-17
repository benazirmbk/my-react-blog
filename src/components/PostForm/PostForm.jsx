import { useState } from 'react'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'

import styles from './PostForm.module.css'

const PostForm = ({ create }) => {
	const [text, setText] = useState({
		title: '',
		body: '',
	})

	const addNewPost = e => {
		e.preventDefault()
		if (!(text.title && text.body)) return alert('Поля пустые...')
		const newPost = {
			title: text.title,
			body: text.body,
		}
		create(newPost)
		setText({ title: '', body: '' })
	}
	return (
		<div className={styles.postForm}>
			<h1 className={styles.postFormTitle}>Создай свой пост</h1>
			<form className={styles.formWrapper}>
				<Input
					onChange={e => setText({ ...text, title: e.target.value })}
					value={text.title}
					placeholder='Название поста'
				/>
				<Input
					onChange={e => setText({ ...text, body: e.target.value })}
					value={text.body}
					placeholder='Описание поста'
				/>
				<Button onClick={addNewPost} view='orange'>
					Создать пост
				</Button>
			</form>
			<div
				style={{
					margin: '20px 0',
					border: '1px solid #D7DADD',
					background: '#FFFFFF',
				}}
			></div>
		</div>
	)
}

export default PostForm
