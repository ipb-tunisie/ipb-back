const { connectedUser } = require('./connectedUser')

const { login } = require('./login')
const { logout } = require('./logout')
const { register } = require('./register')

exports.connectedUser = connectedUser

exports.login = login
exports.logout = logout
exports.register = register
