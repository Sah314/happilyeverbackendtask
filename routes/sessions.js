const express = require('express');
const router  = express.Router();
const {getSessions,getMySessions,bookSession,addSession} = require('../controllers/sessioncontroller');
const authorization = require('../middlewares/authorization')

router.post('/addsessions',addSession)
router.get('/',authorization,getSessions);
router.get('/Mysessions',authorization,getMySessions);
router.put('/booksession/:sessionId',authorization,bookSession)

module.exports=router;