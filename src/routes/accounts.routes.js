const { Router } = require('express');
const accountsController = require('../controllers/accounts.controller');

const router = Router();

router.get('/', accountsController.findAll);
router.get('/:id', accountsController.findOne);
router.post('/', accountsController.create);
router.post('/byEmail', accountsController.findOneByEmail);
router.put('/:id', accountsController.update);
router.delete('/:id', accountsController.deleteOne);

module.exports = router;
