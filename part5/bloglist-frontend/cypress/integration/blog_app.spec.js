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

			cy.request('GET', 'http://localhost:3001/api/blogs').its('body').should('have.length', 1)

		})
	})
})
