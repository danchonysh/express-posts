const { Schema, Model, model, connection} = require('mongoose')
const autoincr = require('mongoose-auto-increment')

autoincr.initialize(connection)

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
	}
})

class Post extends Model {
	get id() {
		return this._id
	}
}

postSchema.plugin(autoincr.plugin, {
	model: 'Post_model',
	startAt: 1
})

module.exports = model(Post, postSchema, 'posts')