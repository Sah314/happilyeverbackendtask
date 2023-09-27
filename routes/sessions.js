const express = require('express');
const router  = express.Router();
const {getSessions,getMySessions,bookSession} = require('../controllers/sessioncontroller');
const authorization = require('../middlewares/authorization')


router.get('/',authorization,getSessions);
router.get('/Mysessions',authorization,getMySessions);
router.put('/booksession/:id/:dayid',authorization,bookSession)

module.exports=router;