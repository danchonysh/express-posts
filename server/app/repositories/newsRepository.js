const path = require('path')
const fs = require('fs')
const News = require('../../models/news')

exports.getLimited = async (limit) => {
	return await News.find({}).sort({_id: -1}).limit(limit).exec()
}

exports.getAll = async () => {
	return await News.find({}).sort({_id: -1}).exec()
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
	const editted = await News.findOneAndUpdate({_id: id}, body).exec()
	return editted
}