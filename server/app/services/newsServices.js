const newsRepository = require('../repositories/newsRepository')

exports.getLimitedNews = async (limit) => {
	const result = await newsRepository.getLimited(limit)
	return result
}

exports.getAllNews = async () => {
	const result = await newsRepository.getAll()
	return result
}

exports.createNews = async (data) => {
	const {title, article} = data
	if (!title) {
		throw Error
	}
	if (!article) {
		throw Error
	}
	const result = await newsRepository.createNews(data) 
	return result
}

exports.removeNews = async (id) => {
	if (!id) {
		throw Error
	}
	const result = await newsRepository.removeNews(+id)
	return result
}

exports.editNews = async (body, id) => {
	if (!id) {
		throw Error
	}
	if (!body.title) {
		throw Error
	}
	if (!body.article) {
		throw Error
	}
	const result = await newsRepository.editNews(body, id)
	return result
}