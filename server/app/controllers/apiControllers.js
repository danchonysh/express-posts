const newsServices = require('../services/newsServices')
const postsServices = require('../services/postsServices')
const multer = require('../../middleware/upload')

const upload = multer.single('image')

exports.getNews = async (req, res, next) => {
	try {
		const result = await newsServices.getAllNews()
		res.status(200).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.createNews = async (req, res, next) => {
	try {
		const result = await newsServices.createNews(req.body)
		res.status(201).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.removeNews = async (req, res, next) => {
	try {
		const result = await newsServices.removeNews(req.params.id)
		res.status(200).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.getPosts = async (req, res, next) => {
	try {
		const result = await postsServices.getAllPosts()
		res.status(200).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.createPost = async (req, res, next) => {
	try {
		console.log(req.body)
		upload(req, res, (err) => {
			if (err) {
				res.json({ status: err })
			}
			console.log('Text fields: ', req.body)
			console.log('File: ', req.file)
 		})
		res.status(200).json({
			status: 'Success'
		})
		// const result = await postsServices.createPost(req.body)
		// res.status(201).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.removePost = async (req, res, next) => {
	try {
		const result = await postsServices.removePost(req.params.id)
		res.status(200).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}