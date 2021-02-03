const fs = require('fs')
const path = require('path')

const getData = (fileName) => {
	const data = fs.readFileSync(path.resolve(__dirname, `${fileName}.json`), (err, data) => {
		if (err) {
			console.warn(err)
		}
	})

	return JSON.parse(Buffer.from(data).toString())
}

const rewriteData = (data, fileName) => {
	fs.writeFileSync(path.resolve(__dirname, `${fileName}.json`), data, err => {
		if (err) {
			throw err
		}
	})
}

module.exports = {getData, rewriteData}