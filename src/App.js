import Header from './components/Header/Header'
import PostFilter from './components/PostFilter/PostFilter'
import PostForm from './components/PostForm/PostForm'
import PostList from './components/PostList/PostList'
import Button from './components/UI/Button/Button'
import Modal from './components/UI/Modal/Modal'
import { useEffect, useState } from 'react'
import PostService from './api/postService'

import './style/App.css'
import Spinner from './components/Loader/Loader'
import { getCountPages } from './utils/utilsCountPages'
import { useSortedPosts } from './components/hooks/usePosts'

const App = () => {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [activeModal, setActiveModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const sortedAndSearchPosts = useSortedPosts(posts, filter.sort, filter.query)
	const [allPage, setAllPage] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)

	const arrPages = []

	for (let i = 0; i < allPage; i++) {
		arrPages.push(i + 1)
	}

	useEffect(() => {
		getAllPosts()
	}, [page])

	async function getAllPosts() {
		const response = await PostService.getAll(limit, page)
		setPosts(response.data)
		const total = response.headers['x-total-count']
		setAllPage(getCountPages(total, limit))
		setIsLoading(true)
	}

	const createPost = post => {
		post.id = Date.now()
		setPosts([...posts, post])
		setActiveModal(false)
	}

	const deletedPost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div>
			<Header />
			<div className='wrapper'>
				<Button
					onClick={() => setActiveModal(true)}
					style={{ margin: '10px 0' }}
				>
					Создать пост
				</Button>
				<Modal activeModal={activeModal} setActiveModal={setActiveModal}>
					<PostForm create={createPost} />
				</Modal>
				<PostFilter filter={filter} setFilter={setFilter} />
				{isLoading ? (
					sortedAndSearchPosts.length > 0 ? (
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
					)
				) : (
					<Spinner />
				)}
				{arrPages.map(page => (
					<Button
						onClick={() => setPage(page)}
						key={page}
						style={{ margin: '5px', maxWidth: '30px' }}
					>
						{page}
					</Button>
				))}
			</div>
		</div>
	)
}

export default App
