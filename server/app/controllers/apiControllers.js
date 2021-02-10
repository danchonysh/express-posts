const newsServices = require('../services/newsServices')
const postsServices = require('../services/postsServices')
const multer = require('../../middleware/upload')

const fs = require('fs')
const path = require('path')

const upload = multer.single('image')

const getParams = (url) => {
	const params = {}
	if (url.includes('?')) {
		url.split('?')[1]
			.split('&')
			.forEach(el => {
				const pair = el.split('=')
				params[pair[0]] = pair[1]	
			})
	}
	return params
}

exports.getNews = async (req, res, next) => {
	try {
		let result
		const limit = +getParams(req.url).limit
		if (limit) {
			result = await newsServices.getLimitedNews(limit)
		} else {
			result = await newsServices.getAllNews()
		}
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

exports.editNews = async (req, res, next) => {
	try {
		const result = await newsServices.editNews(req.body, req.params.id)
		res.status(200).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.getPosts = async (req, res, next) => {
	try {
		let result
		const limit = +getParams(req.url).limit
		if (limit) {
			result = await postsServices.getLimitedPosts(limit)
		} else {
			result = await postsServices.getAllPosts()
		}
		res.status(200).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.createPost = async (req, res, next) => {
	try {
		upload(req, res, async (err) => {
			if (err) {
				res.json({ status: err })
			}
			if (req.file && req.body) {
				const post = {
					image: req.file.path,
					caption: req.body.caption,
					date: new Date(Date.now()).toLocaleString()
				}
				const result = await postsServices.createPost(post)
				res.status(201).json(result)
			}
 		})
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

exports.setPreview = async (req, res, next) => {
	try {
		upload(req, res, async (err) => {
			if (err) {
				res.json({ status: err })
			}
			if (req.file) {
				const result = { 
					preview: req.file.path,
					id: +req.params.id 
				}
				if (req.body.prev) {
					fs.unlink(path.resolve(__dirname, `../../../${req.body.prev}`), err => {
						if (err) {
							console.log(err)
						}
					})
				}
				res.status(201).json(result)
			}
 		})
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.editPost = async (req, res, next) => {
	try {
		const result = await postsServices.editPost(req.body, req.params.id)
		res.status(200).json(result)
	} catch (e) {
		console.warn('Error: ', e)
	}
}

exports.deletePreview = async (req, res, next) => {
	try {
		const { preview } = req.body
		fs.unlink(path.resolve(__dirname, `../../../${preview}`), err => {
			if (err) {
				console.log(err)
			}
		})
		res.status(200).json({ status: 'Deleted'})
	} catch (e) {

	}
}