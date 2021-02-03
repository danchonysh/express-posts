const path = require('path')
const fs = require('fs')
const News = require('../../models/news')

exports.getAll = () => {
	return database.getData('news')
}

exports.createNews = async (data) => {
	const newsItem = new News(data)
	await newsItem.save()
}

exports.removeNews = (id) => {
	let news = database.getData('news')
	news = news.filter(el => el.id !== id)
	const newsJSON = JSON.stringify(news)
	database.rewriteData(newsJSON, 'news')
}