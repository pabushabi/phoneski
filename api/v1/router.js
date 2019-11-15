'use strict';
const router = require('express').Router();
const actions = require('./actions');
const action = new actions();


router.post('/api/v1/login', action.login());
router.post('/api/v1/register', action.register());
router.post('/api/v1/getcalls', action.getCalls());
router.post('/api/v1/newcall', action.newCall());
router.post('/api/v1/deletecall', action.deleteCall());
router.post('/api/v1/updatecall', action.updateCall());


// router.route('/')
//     .get()
//     .post()

module.exports = router;
