const bcrypt = require('bcryptjs')
const passport = require('passport')
const { validateUser, validationResult } = require('../config/validator')
const prisma = require('../lib/prisma')

exports.usersLoginGet = (req, res) => {
  res.render('login-form')
}

exports.usersLoginPost = passport.authenticate('local', {
  successRedirect: '/login-success',
  failureRedirect: '/login-failure',
})

exports.usersRegisterGet = (req, res) => {
  res.render('register-form')
}

exports.usersRegisterPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('register-form', {
        errors: errors.array(),
        data: req.body,
      })
    }

    const { age, firstName, lastName, email, password } = req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      await prisma.user.create({
        data: {
          age: Number(age),
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      })

      res.redirect('/login')
    } catch (error) {
      return next(error)
    }
  },
]

exports.usersLoginSuccess = (req, res) => {
  res.send('<p>You successfully logged in. --> <a href="/">Go to Home Page</a></p>')
}

exports.usersLoginFailure = (req, res) => {
  res.send('Wrong user credentials')
}

exports.usersLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
  })
  res.redirect('/')
}
