const postsRepository = require('../repositories/postsRepository')

exports.getLimitedPosts = async (limit) => {
	const result = await postsRepository.getLimited(limit);
	return result
}

exports.getAllPosts = async () => {
	const result = await postsRepository.getAll();
	return result
}

exports.createPost = async (data) => {
	const {image, caption} = data
	if (!image) {
		throw Error
	}
	if (!caption) {
		throw Error
	}
	const result = await postsRepository.createPost(data) 
	return result
}

exports.removePost = async (id) => {
	if (!id) {
		throw Error
	}
	const result = await postsRepository.removePost(+id)
	return result
}