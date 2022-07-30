export const getCountPages = (allPages, limit) => {
	return Math.ceil(allPages / limit)
}
