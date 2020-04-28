import blogReducer from './blogReducer'
import blogService from '../services/blogs'
import deepFreeze from 'deep-freeze'

describe('Blog reducer', () => {
	test('Blogs can be upvoted', () => {
		const exampleBlog = {
			title: 'testing is fun',
			author: 'testAuthor',
			url: 'testurl.url',
			user: 'fakeUser',
			id: 1,
			upvotes: 0
		}
		const state = [exampleBlog]
		const action = {
			type: 'ADD_VOTE',
			data: exampleBlog
		}

		deepFreeze(state)
		const newState = blogReducer(state, action)

		expect(newState.length).toBe(1)
		expect(newState).toContainEqual({...exampleBlog, upvotes: 1})
	})
	test('Blog can be added', () => {
		const exampleBlog = {
			title: 'testing is fun',
			author: 'testAuthor',
			url: 'testurl.url',
			user: 'fakeUser',
			id: 1,
			upvotes: 0
		}
		const newBlog = {
			title: 'testing is fun again',
			author: 'testAuthor2',
			url: 'testurl.url2',
			user: 'fakeUser',
			id: 2,
			upvotes: 0
		}
		const state = [exampleBlog]
		const action = {
			type: 'ADD_BLOG',
			data: newBlog
		}

		deepFreeze(state)
		const newState = blogReducer(state, action)

		expect(newState.length).toBe(2)
		expect(newState).toContainEqual(state[0])
		expect(newState).toContainEqual(newBlog)
	})
	test('Blog can be removed', () => {
		const exampleBlog = {
			title: 'testing is fun',
			author: 'testAuthor',
			url: 'testurl.url',
			user: 'fakeUser',
			id: 1,
			upvotes: 0
		}
		const newBlog = {
			title: 'testing is fun again',
			author: 'testAuthor2',
			url: 'testurl.url2',
			user: 'fakeUser',
			id: 2,
			upvotes: 0
		}
		const state = [exampleBlog, newBlog]
		const action = {
			type: 'REMOVE_BLOG',
			data: newBlog
		}

		deepFreeze(state)
		const newState = blogReducer(state, action)

		expect(newState.length).toBe(1)
		expect(newState).toContainEqual(exampleBlog)
	})
	test('Blogs can be initialised', () => {
		const exampleBlog = {
			title: 'testing is fun',
			author: 'testAuthor',
			url: 'testurl.url',
			user: 'fakeUser',
			id: 1,
			upvotes: 0
		}
		const newBlog = {
			title: 'testing is fun again',
			author: 'testAuthor2',
			url: 'testurl.url2',
			user: 'fakeUser',
			id: 2,
			upvotes: 0
		}
		const state = []
		const action = {
			type: 'INITIALISE_BLOGS',
			data: [exampleBlog, newBlog]
		}

		deepFreeze(state)
		const newState = blogReducer(state, action)

		expect(newState.length).toBe(2)
		expect(newState).toContainEqual(exampleBlog)
		expect(newState).toContainEqual(newBlog)
	})
})
