const express = require('express')
const router = express.Router()
const apiController = require('../app/controllers/apiControllers')

router.get('/news', apiController.getNews)
router.post('/news', apiController.createNews)
router.delete('/news/:id', apiController.removeNews)

router.get('/posts', apiController.getPosts)
router.post('/posts', apiController.createPost)
router.delete('/posts/:id', apiController.removePost)

module.exports = router