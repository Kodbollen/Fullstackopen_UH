
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
		cy.get('#username').type('root')
		cy.get('#password').type('goodpassword')
		cy.get('#loginButton').click()
	})
})
