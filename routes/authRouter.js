const { Router } = require('express')
const authController = require('../controllers/authController')

const authRouter = Router()

authRouter.get('/login', authController.usersLoginGet)

authRouter.post('/login', authController.usersLoginPost)

authRouter.get('/register', authController.usersRegisterGet)

authRouter.post('/register', authController.usersRegisterPost)

authRouter.get('/logout', authController.usersLogout)

authRouter.get('/login-success', authController.usersLoginSuccess)

authRouter.get('/login-failure', authController.usersLoginFailure)

module.exports = authRouter
