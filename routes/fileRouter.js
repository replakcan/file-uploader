const { Router } = require('express')
const { isAuth } = require('./authMiddleware')
const fileController = require('../controllers/fileController')

const fileRouter = Router()

fileRouter.get('/', isAuth, fileController.usersFileUploadGet)

fileRouter.post('/', isAuth, fileController.usersFileUploadPost)

module.exports = fileRouter
