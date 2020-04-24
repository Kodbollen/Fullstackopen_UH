import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Blog from './Blog'

test('Only renders title and author by default', () => {
    const user = {
        username: 'root',
        name: 'Super user',
        id: '5ea1a3529143e73eb4efeb0e'
	}
	const testBlog = {
		title: 'Test blog',
		author: 'Testminister',
		url: 'test.test',
		upvotes: 123,
		user: user
	}

	const component = render(<Blog blog={testBlog} user={user}/>)

    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Testminister')
    expect(component.container).not.toHaveTextContent('test.test')
    expect(component.container).not.toHaveTextContent('123')
})
