const { Router } = require('express');
const accountsController = require('../controllers/accounts.controller');

const router = Router();

router.get('/', accountsController.findOne);

module.exports = router;