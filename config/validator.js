const { body, validationResult } = require('express-validator')
const prisma = require('../lib/prisma')

const alphaErr = 'must contain only letters'
const lengthErr = 'must be between 1 and 10 characters'

const validateUser = [
  body('age')
    .isNumeric()
    .withMessage('Age must be a number')
    .custom((value) => {
      const age = Number(value)
      return age >= 18 && age <= 120
    })
    .withMessage('Age must be between 18 and 120'),

  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),

  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const user = await prisma.user.findFirst({
        where: {
          email: value,
        },
      })

      if (user) throw new Error('E-mail already in use')
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('passwordConfirmation')
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .withMessage('passwords do not match'),
]

module.exports = { validateUser, validationResult }
