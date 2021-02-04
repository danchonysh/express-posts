const path = require('path')
const fs = require('fs')
const News = require('../../models/news')

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