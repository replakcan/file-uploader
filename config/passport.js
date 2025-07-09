const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
}

const verifyCallback = async (username, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: username,
      },
    })

    if (!user) return done(null, false, { message: 'Incorrect email' })

    const match = await bcrypt.compare(password, user.password)

    if (!match) return done(null, false, { message: 'Incorrect password' })

    return done(null, user)
  } catch (error) {
    return done(error)
  }
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    done(null, user)
  } catch (error) {
    done(error)
  }
})
