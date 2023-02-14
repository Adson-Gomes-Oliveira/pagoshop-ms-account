const { Router } = require('express');
const accountsController = require('../controllers/accounts.controller');

const router = Router();

router.get('/', accountsController.findAll);
router.post('/', accountsController.create);
router.put('/:id', accountsController.edit);
router.delete('/:id', accountsController.deleteOne);

module.exports = router;
