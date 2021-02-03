const newsRepository = require('../repositories/newsRepository')

exports.getAllNews = async () => {
	const result = await newsRepository.getAll();
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
}

exports.removeNews = async (id) => {
	if (!id) {
		throw Error
	}
	const result = await newsRepository.removeNews(+id)
}