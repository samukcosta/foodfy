const dotenv = require('dotenv/config')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')

module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: process.env.SE_SECRET,
    resave: process.env.SE_RESAVE,
    saveUninitialized: process.env.SE_SAVEUNI,
    cookie: {
        maxAge: 24*60*60*1000
    }
})