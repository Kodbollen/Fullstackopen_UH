describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			username: 'tester',
			name: 'testminister',
			password: 'test123'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})
	it('Front page can be opened', function() {
		cy.visit('http://localhost:3000')
		cy.contains('username')
	})
	it('Login - User can login', function() {
		cy.visit('http://localhost:3000')
		cy.get('#username').type('tester')
		cy.get('#password').type('test123')
		cy.get('#loginButton').click()

		cy.contains('Current user')
	})
	it('Login - should fail on wrong credentials', function() {
		cy.visit('http://localhost:3000')
		cy.get('#username').type('root')
		cy.get('#password').type('faultypassword')
		cy.get('#loginButton').click()
		cy.get('.error').should('contain', 'failed')
		cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
	})
	describe('After login', function() {
		beforeEach(function() {
			cy.login({username: 'tester', password: 'test123'})
		})
		it('Blog can be created', function() {
			cy.get('#toggleVisibilityButton').click()
			const form = cy.get('form')
			cy.get('#title').type('test blog')
			cy.get('#author').type('Testminister')
			cy.get('#url').type('test.url')
			cy.get('#submitBlogForm').click()

			cy.get('.toggleDetails').should('contain', 'details')

			cy.createBlog({title: 'test blog2', author: 'Testminister', url: 'test.url2'})

			cy.request('GET', 'http://localhost:3001/api/blogs').its('body').should('have.length', 2)
		})
		it('Blog can be upvoted', function() {
			cy.createBlog({title: 'test blog', author: 'Testminister', url: 'test.url'})
			cy.get('.toggleDetails').click()

			cy.get('.upvoteDiv').should('contain', '0')
			cy.get('.upvoteButton').click()
			cy.get('.upvoteDiv').should('contain', '1')
		})
		it('Blog can be deleted', function() {
			cy.createBlog({title: 'test blog', author: 'Testminister', url: 'test.url'})
			cy.get('.toggleDetails').click()
			cy.get('.removeBtn').click()

			cy.request('GET', 'http://localhost:3001/api/blogs').its('body').should('have.length', 0)
		})
		it('Blogs are sorted correctly when shown', function() {
			cy.createBlog({title: 'test blog1', author: 'Testminister', url: 'test.url1', upvotes: '123'})
			cy.createBlog({title: 'test blog2', author: 'Testminister', url: 'test.url2', upvotes: '1234'})
			cy.createBlog({title: 'test blog3', author: 'Testminister', url: 'test.url3', upvotes: '1235'})
			cy.createBlog({title: 'test blog4', author: 'Testminister', url: 'test.url4'})

			cy.get('.blogDiv').should('contain', 'test blog3')
			cy.get('.blogDiv').should('contain', 'test blog2')
			cy.get('.blogDiv').should('contain', 'test blog1')
			cy.get('.blogDiv').should('contain', 'test blog4')
		})
	})
})
