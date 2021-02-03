const { Schema, Model, model, connection} = require('mongoose')
const autoincr = require('mongoose-auto-increment')

autoincr.initialize(connection)

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
	}
})

class News extends Model {
	get id() {
		return this._id
	}
}

newsSchema.plugin(autoincr.plugin, {
	model: 'News_model',
	startAt: 1
})

module.exports = model(News, newsSchema, 'news')