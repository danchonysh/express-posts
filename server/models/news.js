const { Scheme, model} = require('mongoose')

const newsScheme = new Scheme({
	title: {
		Type: String,
		Required: true
	},
	article: {
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

module.exports = model('News', newsScheme)