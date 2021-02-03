const path = require('path')
const fs = require('fs')
const Posts = require('../../models/news')

exports.getAll = async () => {
	return await Posts.find({})
}

exports.createPosts = async (data) => {
	const post = new Posts(data)
	await post.save()
}

exports.removePosts = async (id) => {
	await Posts.remove({id: id})
}