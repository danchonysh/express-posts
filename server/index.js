const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const createConnection = require('./database/database')

const apiRouter = require('./routes/api')

app.use('/server/uploads', express.static(path.resolve(__dirname, './uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const whitelist = ['http://localhost:8080', 'http://localhost:3000']
const corsConfig = {
	origin: (origin, cb) => {
		if (whitelist.indexOf(origin) !== -1) {
			cb(null, true)
		} else {
			cb(new Error('Not allowed by CORS'))
		}
	}
}

app.use(cors(corsConfig))

app.use('/api', apiRouter)

createConnection()
	.then(() => {
		app.listen(PORT, () => console.log('Server has been started...'))
	})
	.catch(err => console.log('Error: ', JSON.stringify(err)))