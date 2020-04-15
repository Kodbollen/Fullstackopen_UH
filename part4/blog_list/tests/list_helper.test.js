const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('Total upvotes', () => {
	const blogs = [
		{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", upvotes: 7, __v: 0 },
		{ _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", upvotes: 5, __v: 0 },
		{ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", upvotes: 12, __v: 0 },
		{ _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", upvotes: 10, __v: 0 },
		{ _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", upvotes: 0, __v: 0 },
		{ _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", upvotes: 2, __v: 0 }]

	const singleBlog = [{ _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", upvotes: 2, __v: 0 }]
	
	test('empty list should result in zero', () => {
		const total = listHelper.totalUpvotes([])
		expect(total).toBe(0)
	})
	test('list of one count should result in that count', () => {
		const total = listHelper.totalUpvotes(singleBlog)
		expect(total).toBe(2)
	})
	test('longer list should result in correct total', () => {
		const total = listHelper.totalUpvotes(blogs)
		expect(total).toBe(36)
	})
})
