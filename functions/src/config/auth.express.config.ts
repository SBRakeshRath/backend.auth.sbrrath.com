import express = require('express');
import router from '../authRoute/auth.router';

const authApp = express()

authApp.use(router)


export default authApp;