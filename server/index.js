const express = require('express')
const path = require('path')
const app = express()
const PORT = 3030 || process.env.PORT
const createConnection = require('./database/database')

const apiRouter = require('./routes/api')

app.use(express.static(path.resolve(__dirname, '../client')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRouter)

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

createConnection()
	.then(() => {
		app.listen(PORT, () => console.log('Server has been started...'))
	})
	.catch(err => console.log('Error: ', JSON.stringify(err)))