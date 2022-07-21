import styles from './PostFilter.module.css'
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select'

const PostFilter = ({ filter, setFilter }) => {
	return (
		<div className='filterComponent'>
			<Input
				onChange={e => setFilter({ ...filter, query: e.target.value })}
				value={filter.query}
				placeholder='Поиск'
			/>
			<Select
				onChange={sortedPost => setFilter({ ...filter, sort: sortedPost })}
				value={filter.sort}
				defaultValue='Сортировка'
				options={[
					{ value: 'title', name: 'По заголовку' },
					{ value: 'body', name: 'По описанию' },
				]}
			/>
		</div>
	)
}

export default PostFilter
