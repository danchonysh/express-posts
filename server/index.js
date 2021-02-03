const express = require('express')
const path = require('path')
const app = express()

const apiRouter = require('./routes/api')

app.use(express.static(path.resolve(__dirname, '../client')))
app.use(express.json())
app.use('/api', apiRouter)

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.listen('5000', () => console.log('Server has been started...'))