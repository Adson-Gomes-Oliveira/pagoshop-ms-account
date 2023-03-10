const passport = require('passport');
const { Router } = require('express');
const accountsController = require('../controllers/accounts.controller');
const loginController = require('../controllers/login.controller');

const router = Router();

router.post('/', accountsController.create);

router.use(passport.authenticate('bearer', { session: false }));

router.get('/', accountsController.findAll);
router.get('/loggout', loginController.loggout);
router.get('/:id', accountsController.findOne);
router.put('/:id', accountsController.edit);
router.delete('/:id', accountsController.deleteOne);

module.exports = router;
