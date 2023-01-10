 const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config();
const server =  express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))

const locationRouter = require('./src/location/locationController')
const authRouter = require('./src/authentication/authHandler')

server.use('/location', locationRouter)
server.use('/auth', authRouter)

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))
