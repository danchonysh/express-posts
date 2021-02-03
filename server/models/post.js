const { Schema, model} = require('mongoose')

const postSchema = new Schema({
	image: {
		type: String,
		required: true
	},
	caption: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	id: {
		type: Number,
		required: true
	}
})

module.exports = model('Post', postSchema)