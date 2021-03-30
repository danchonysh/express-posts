const path = require('path')
const fs = require('fs')
const Posts = require('../../models/post')

exports.getLimited = async (limit) => {
	return await Posts.find({}).sort({_id: -1}).limit(limit).exec()
}

exports.getAll = async () => {
	return await Posts.find({}).sort({_id: -1}).exec()
}

exports.createPost = async (data) => {
	const post = await new Posts(data).save()
	return post
}

exports.removePost = async (id) => {
	const [ post ] = await Posts.find({_id: id}).exec()
	fs.unlink(path.resolve(__dirname, `../../../${post.image}`), err => {
		if (err) {
			console.log(err)
		}
	})

	const deleted = await Posts.deleteOne({_id: id}).exec()
	return deleted
}

exports.editPost = async (body, id) => {
	const post = { ...body }
	delete post.prev
	if (body.prev) fs.unlink(path.resolve(__dirname, `../../../${body.prev}`), err => {
		if (err) {
			console.log(err)
		}
	})
	const edited = await Posts.findOneAndUpdate({_id: id}, post).exec()
	// edited.image = body.image
	// edited.caption = body.caption
	// edited.date = body.date
	return edited
}

exports.editPostText = async (body, id) => {
	const edited = await Posts.findOneAndUpdate({_id: id}, body).exec()
	// edited.caption = body.caption
	// edited.date = body.date
	return edited
}