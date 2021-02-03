const path = require('path')
const fs = require('fs')
const database = require('../../database/db.js')

exports.getAll = () => {
	return database.getData('posts')
}

exports.createPost = (data) => {
	let posts = database.getData('posts')
	posts.unshift(data)
	const postsJSON = JSON.stringify(posts)
	database.rewriteData(postsJSON, 'posts')
}

exports.removePost = (id) => {
	let news = database.getData('posts')
	news = news.filter(el => el.id !== id)
	const postsJSON = JSON.stringify(news)
	database.rewriteData(postsJSON, 'posts')
}