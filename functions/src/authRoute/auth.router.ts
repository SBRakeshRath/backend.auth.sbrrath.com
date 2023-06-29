import express = require('express')
import sendOtpInEmail from './sendOtpInEmail'
import createUser from './createUser'
const router = express.Router()




router.get('/',(req,res)=>{
    res.send('hello world')
})

router.post('/sendOtpInEmail',sendOtpInEmail)
router.post('/createUser',createUser)


export default router

