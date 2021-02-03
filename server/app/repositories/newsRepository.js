const path = require('path')
const fs = require('fs')
const database = require('../../database/db.js')

exports.getAll = () => {
	return database.getData('news')
}

exports.createNews = (data) => {
	let news = database.getData('news')
	news.unshift(data)
	const newsJSON = JSON.stringify(news)
	database.rewriteData(newsJSON, 'news')
}

exports.removeNews = (id) => {
	let news = database.getData('news')
	news = news.filter(el => el.id !== id)
	const newsJSON = JSON.stringify(news)
	database.rewriteData(newsJSON, 'news')
}