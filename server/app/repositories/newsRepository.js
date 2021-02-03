const path = require('path')
const fs = require('fs')
const News = require('../../models/news')

exports.getAll = async () => {
	return await News.find({})
}

exports.createNews = async (data) => {
	const newsItem = new News(data)
	await newsItem.save()
}

exports.removeNews = (id) => {
	News.remove({id: id})
}