const router = require('express').Router();
const menuController = require('../controllers/menu.controller');

router.route('/').get(menuController.find);
router.route('/:id').get(menuController.findById);
router.route('/:id').post(menuController.create);

module.exports = router;
