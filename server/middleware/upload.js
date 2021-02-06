const multer = require('multer')
const path = require('path')

const getDate = () =>  new Date(Date.now())

const isIncluded = (element, array) => {
	let result = 0
	array.forEach(el => {
		if (el === element) {
			result+=1
		}
	})
	return result
}

const storage = multer.diskStorage({
	destination: '../uploads',
	filename(req, file, cb) {
		cb(null, `${getDate()}-${file.originalname}`)
	} 
})

const fileFilter = (req, file, cb) => {
	if (isIncluded(file.mimetype, [
		'image/png',
		'image/jpeg'
	])) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const limits = {
	fileSize: 1024 * 1024 * 5
}

module.exports = multer({ storage, fileFilter, limits })