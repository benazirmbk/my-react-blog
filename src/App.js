import { useState } from 'react'
import Header from './components/Header/Header'
import PostForm from './components/PostForm/PostForm'
import PostList from './components/PostList/PostList'

import './style/App.css'

const App = () => {
	const [posts, setPosts] = useState([])

	const createPost = post => {
		post.id = Date.now()
		setPosts([...posts, post])
	}

	const deletedPost = id => {
		setPosts(posts.filter(p => p.id !== id))
	}
	return (
		<div>
			<Header />
			<div className='wrapper'>
				<PostForm create={createPost} />
				<PostList posts={posts} deleted={deletedPost} />
			</div>
		</div>
	)
}

export default App
