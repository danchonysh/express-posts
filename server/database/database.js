const mongoose = require('mongoose')
const link = 'mongodb+srv://therealshady:1q2w3e4r@cluster0.esypr.mongodb.net/<dbname>?retryWrites=true&w=majority'

const createConnection = () => {
	return mongoose.connect(link, {
		useNewUrlParser: true,
	})
}

module.exports = createConnection