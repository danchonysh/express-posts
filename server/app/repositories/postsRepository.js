const path = require('path')
const fs = require('fs')
const Posts = require('../../models/post')

exports.getAll = async () => {
	return await Posts.find({}).exec()
}

exports.createPost = async (data) => {
	const post = await new Posts(data).save()
	return post
}

exports.removePost = async (id) => {
	const deleted = await Posts.deleteOne({id}).exec()
	return deleted
}