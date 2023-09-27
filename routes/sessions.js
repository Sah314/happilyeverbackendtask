const express = require('express');
const router  = express.Router();
const getsessions = require('../controllers/sessioncontroller');
const authorization = require('../middlewares/authorization')


router.get('/',authorization,getsessions);
//router.post('/',);


module.exports=router;