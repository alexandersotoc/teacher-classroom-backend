const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/authentication');

router.post('/signin', AuthController.signin);

module.exports = router;