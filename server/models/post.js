const { Scheme, model} = require('mongoose')

const postScheme = new Scheme({
	image: {
		Type: String,
		Required: true
	},
	caption: {
		Type: String,
		Required: true
	},
	date: {
		Type: String,
		Required: true
	},
	id: {
		Type: Number,
		Required: ture
	}
})

module.exports = model('Post', postScheme)