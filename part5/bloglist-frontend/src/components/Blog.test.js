import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

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

test('Only renders title and author by default', () => {
	const component = render(<Blog blog={testBlog} user={user}/>)

    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Testminister')
    expect(component.container).not.toHaveTextContent('test.test')
    expect(component.container).not.toHaveTextContent('123')
})

test('Url and upvote count is showed after toggling show blog details', () => {
    const component = render(<Blog blog={testBlog} user={user}/>)
    const button = component.container.querySelector('.toggleDetails')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('test.test')
    expect(component.container).toHaveTextContent('123')
})
