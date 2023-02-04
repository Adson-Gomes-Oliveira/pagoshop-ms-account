const { Router } = require('express');
const accountsController = require('../controllers/accounts.controller');

const router = Router();

router.get('/', accountsController.findAll);
router.post('/', accountsController.create);

module.exports = router;