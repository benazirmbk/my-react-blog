import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header/Header'
import PostFilter from './components/PostFilter/PostFilter'
import PostForm from './components/PostForm/PostForm'
import PostList from './components/PostList/PostList'
import Button from './components/UI/Button/Button'
import Modal from './components/UI/Modal/Modal'

import './style/App.css'

const App = () => {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [activeModal, setActiveModal] = useState(false)

	const sortedPost = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) =>
				a[filter.sort].localeCompare(b[filter.sort])
			)
		}
		return posts
	}, [filter.sort, posts])

	const sortedAndSearchPosts = useMemo(() => {
		return sortedPost.filter(post =>
			post.title.toLowerCase().includes(filter.query.toLowerCase())
		)
	}, [filter.query, sortedPost])

	const createPost = post => {
		post.id = Date.now()
		setPosts([...posts, post])
		setActiveModal(false)
	}

	const deletedPost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	// const sortPost = sort => {
	//   setSelectedSort(sort)
	//   setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
	// }
	return (
		<div>
			<Header />
			<div className='wrapper'>
				<Button
					onClick={() => setActiveModal(true)}
					style={{ margin: '10px o' }}
				>
					Создать пост
				</Button>
				<Modal activeModal={activeModal} setActiveModal={setActiveModal}>
					<PostForm create={createPost} />
				</Modal>
				<PostFilter filter={filter} setFilter={setFilter} />
				{sortedAndSearchPosts.length > 0 ? (
					<PostList posts={sortedAndSearchPosts} deleted={deletedPost} />
				) : (
					<h2
						style={{
							textAlign: 'center',
							fontWeight: 900,
							fontSize: '30px',
							color: '#1e212c',
						}}
					>
						Список пуст :)
					</h2>
				)}
			</div>
		</div>
	)
}

export default App
