const News = require('../../models/news')

exports.getLimited = async (limit) => {
	return await News.find({}).limit(limit).exec()
}

exports.getAll = async () => {
	return await News.find({}).exec()
}

exports.createNews = async (data) => {
	const result = await new News(data).save()
	return result
}

exports.removeNews = async (id) => {
	const deleted = await News.deleteOne({_id: id}).exec()
	return deleted
}

exports.editNews = async (body, id) => {
	const edited = await News.findOneAndUpdate({_id: id}, body).exec()
	edited.title = body.title
	edited.article = body.article
	edited.date = new Date(Date.now()).toLocaleString()
	return edited
}