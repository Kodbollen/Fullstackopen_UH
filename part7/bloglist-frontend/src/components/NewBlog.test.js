import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'

let user
let testBlog

beforeEach(() => {
    user = {
        username: 'root',
        name: 'Super user',
        id: '5ea1a3529143e73eb4efeb0e'
	}
	testBlog = {
		title: 'Test blog',
		author: 'Testminister',
		url: 'test.test',
		upvotes: 123,
		user: user
	}
})

test('NewBlog form properly sets states and completes function call', () => {
	const addBlog = jest.fn()

	const component = render(<NewBlog addBlog={addBlog}/>)

	const titleInput = component.container.querySelector('#title')
	const authorInput = component.container.querySelector('#author')
	const urlInput = component.container.querySelector('#url')
	const form = component.container.querySelector('form')

	fireEvent.change(titleInput, {target: {value: testBlog.title}})
	fireEvent.change(authorInput, {target: {value: testBlog.author}})
	fireEvent.change(urlInput, {target: {value: testBlog.url}})
	fireEvent.submit(form)

	expect(addBlog.mock.calls).toHaveLength(1)
	expect(addBlog.mock.calls[0][0].title).toBe(testBlog.title)
	expect(addBlog.mock.calls[0][0].author).toBe(testBlog.author)
	expect(addBlog.mock.calls[0][0].url).toBe(testBlog.url)
})
