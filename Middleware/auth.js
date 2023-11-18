const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
  try {
    const token = req
      .header('Authorization')
      .split(' ')[1]
      .replace('"', '')
      .replace('"', '')
    if (token && token.length > 0) {
      const data = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findOne({
        email: data.user.email,
        'tokens.token': token
      })
      if (!user) {
        throw new Error('Not authorized to access this resource') // TODO: chager l'erreur en reponse http
      }

      req.user = user
      req.token = token
      next()
    } else {
      throw new Error('Not authorized to access this resource')
    }
  } catch (error) {
    // TODO: afficher error en response ?
    res.status(401).send({ error: 'Not authorized to access this resource' }) // if not valid jwt
  }
}

module.exports = auth
