const { Schema, model} = require('mongoose')

const newsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	article: {
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

module.exports = model('News', newsSchema)