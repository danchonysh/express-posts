const multer = require('multer')

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
	destination(req, file, cb) {
		cb(null, `server/uploads/`)
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`)
	} 
})

const fileFilter = (req, file, cb) => {
	if (isIncluded(file.mimetype, [
		'image/png',
		'image/jpeg',
		'image/webp'
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