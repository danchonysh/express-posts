const multer = require('multer')

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, `server/uploads/`)
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`)
	} 
})

const fileFilter = (req, file, cb) => {
	const mimetypes = [ 'image/png', 'image/jpeg', 'image/webp' ]
	if (mimetypes.indexOf(file.mimetype) !== -1 ) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const limits = {
	fileSize: 1024 * 1024 * 5
}

module.exports = multer({ storage, fileFilter, limits })