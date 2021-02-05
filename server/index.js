const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = 3030 || process.env.PORT
const createConnection = require('./database/database')

const apiRouter = require('./routes/api')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', apiRouter)

createConnection()
	.then(() => {
		app.listen(PORT, () => console.log('Server has been started...'))
	})
	.catch(err => console.log('Error: ', JSON.stringify(err)))