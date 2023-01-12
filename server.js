 const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const logger = require('./src/utils/logger')
const {auth} = require('./src/middleware/auth')

dotenv.config();
const server =  express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))

const locationRouter = require('./src/location/locationController')
const authRouter = require('./src/authentication/authHandler')

server.use('/location', auth, locationRouter)
server.use('/auth', authRouter)

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>logger.info(`Server is running on port ${PORT}`))
