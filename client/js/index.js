async function request(url, method = 'GET', data = null) {
	try {
		const headers = {}
		let body

		if (data) {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(data)
		}

		const response = await fetch(url, {
			method,
			headers,
			body
		})
		const result = await response.json()
		return await result
	} catch(e) {
		console.warn('Error: ', e)
	}
}
 
let newsArray = [], postsArray = []

const getNews = () =>
	newsArray.map(el => {
		articles.insertAdjacentHTML('beforeend', `
			<section class="article" data-id="${el.id}">
				<h3 class="article__title">${el.title}</h3>
				<p class="article__content">${el.article}</p>
				<span class="article__delete" onclick=deleteArticleHandler(this)>&times;</span>
			</section>
		`)
	})

const getPosts = () => 
	postsArray.map(el => {
		posts.insertAdjacentHTML('beforeend', `
			<figure class="post" data-id="${el.id}">
				<img class="post__photo" src="${el.image}">
				<caption class="post__text">${el.caption}</caption>
				<span class="post__delete" onclick=deletePostHandler(this)>&times;</span>
			</figure>
		`)
	})

async function getData() {
	newsArray = await request('/api/news')
	postsArray = await request('/api/posts')

	getNews()
	getPosts()
}

getData()

const addArticleHandler = () => {
	const addModal = Lib.modal({
		closable: false,
		title: 'Adding article',
		content: `
			<form class="new-aritcle">
				<input name="title" class="new-article__title" type="text" placeholder="Title">
				<textarea name="article" class="new-article__content" type="text" placeholder="Article"></textarea>
			</form>
		`,
		footerButtons: [
			{
				text: 'Add', type: 'ok', async handler() {
					let title = document.querySelector('.new-article__title')
					let content = document.querySelector('.new-article__content')
					
					if (title.value.trim() === '' || content.value.trim() === '') {
						const warning = Lib.modal({
							closable: true,
							title: 'Warning!',
							content: `You must enter title and content.`,
							width: '200px',
							footerButtons: [
								{
									text: 'OK', 
									type: 'ok', 
									handler() {
										warning.close()
										setTimeout(warning.destroy(), 250)
									}
								}
							]
						})
						warning.open()
					} else {
						const id = Date.now()
						articles.insertAdjacentHTML('afterbegin', `
							<section class="article" data-id="${id}">
								<h3 class="article__title">${title.value}</h3>
								<p class="article__content">${content.value}</p>
								<span class="article__delete" onclick=deleteArticleHandler(this)>&times;</span>
							</section>
						`)
						const newsItem = {
							title: title.value,
							article: content.value,
							id
						}
						
						await request('/api/news', 'POST', newsItem)
						addModal.close()
						setTimeout(addModal.destroy(), 250)
					}
				}
			},
			{
				text: 'Cancel', type: 'cancel', handler() {
					addModal.close()
					setTimeout(addModal.destroy(), 250)
				}
			}
		]
	})
	addModal.open()
}

const deleteArticleHandler = context => {
	const deleteModal = Lib.modal({
		closable: true, 
		title: `Deleting article`,
		content: `Do you really want to delete article <strong>${context.parentNode.querySelector('.article__title').textContent}</strong>? You won't be able to undone it later`,
		footerButtons: [
			{
				text: 'OK', type: 'ok', handler: async () => {
					deleteModal.close()
					setTimeout(deleteModal.destroy(), 250)
					context.parentNode.parentNode.removeChild(context.parentNode)
					const id = context.parentNode.dataset.id
					await request(`/api/news/${id}`, 'DELETE')
				}
			},
			{
				text: 'Cancel', type: 'cancel', handler() {
					deleteModal.close()
					setTimeout(deleteModal.destroy(), 250)
				}
			}
		]
	})
	deleteModal.open()
}

const addPostHandler = () => {
	const addModal = Lib.modal({
		closable: false,
		title: 'Adding post',
		content: `
			<form class="new-post" enctype="multipart/form-data" method="post">
				<input class="new-post__photo" id="file" type="file" accept="image/*"><label for="file" class="upload">Choose a file</label>
				<textarea name="article" class="new-post__content" type="text" placeholder="Write something"></textarea>
			</form>
		`,
		footerButtons: [
			{
				text: 'Add', type: 'ok', async handler() {
					const img = document.querySelector('.new-post__photo')
					const caption = document.querySelector('.new-post__content')
					if (caption.value.trim() === '' || img.value === '') {
						const warning = Lib.modal({
							closable: true,
							title: 'Warning!',
							content: `You must upload image and enter caption.`,
							width: '200px',
							footerButtons: [
								{
									text: 'OK', 
									type: 'ok', 
									handler () {
										warning.close()
										setTimeout(warning.destroy(), 250)
									}
								}
							]
						})
						warning.open()
					} else {
						const id = Date.now()
						let src
						const reader = new FileReader()
						reader.readAsDataURL(img.files[0])
						reader.onload = async (e) => {
							src = e.target.result
							posts.insertAdjacentHTML('afterbegin', `
								<figure class="post" data-id="${id}">
									<img class="post__photo" src="${src}">
									<caption class="post__text">${caption.value}</caption>
									<span class="post__delete" onclick=deletePostHandler(this)>&times;</span>
								</figure>			
							`)
						}
						let newPost
						const mutation = new MutationObserver(mutes => {
							mutes.forEach(async (mute) => {
								newPost = {
									image: document.querySelector(`[data-id="${id}"]`).firstElementChild.src,
									caption: caption.value,
									id
								}
								postsArray.unshift(newPost)
								await request('/api/posts', 'POST', newPost)
							})
						})
						mutation.observe(posts, {
							childList: true
						})
						mutation.desconnect()
						addModal.close()
						setTimeout(addModal.destroy(), 250)
					}
				}
			},
			{
				text: 'Cancel', type: 'cancel', handler() {
					addModal.close()
					setTimeout(addModal.destroy(), 250)
				}
			}
		]
	})
	addModal.open()
	document.querySelector('.new-post__photo').addEventListener('input', e => {
		const fileName = e.target.files[0].name
		document.querySelector('.upload').textContent = fileName.length > 12 ? fileName.slice(0,12) + '...' : fileName
	})
}

const deletePostHandler = context => {
	const deleteModal = Lib.modal({
		closable: true, 
		title: `Deleting post`,
		content: `Do you really want to delete this post? You won't be able to undone it later`,
		footerButtons: [
			{
				text: 'OK', type: 'ok', handler: async () => {
					deleteModal.close()
					setTimeout(deleteModal.destroy(), 250)
					context.parentNode.parentNode.removeChild(context.parentNode)
					postsArray = postsArray.filter(el => el.img !== context.previousElementSibling.src)
					const id = context.parentNode.dataset.id
					await request(`/api/posts/${id}`, 'DELETE')
				}
			},
			{
				text: 'Cancel', type: 'cancel', handler() {
					deleteModal.close()
					setTimeout(deleteModal.destroy(), 250)
				}
			}
		]
	})
	deleteModal.open()
}


