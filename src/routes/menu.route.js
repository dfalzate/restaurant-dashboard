const router = require('express').Router();
const menuController = require('../controllers/menu.controller');

router.route('/').get(menuController.find);
router.route('/:idMenu').get(menuController.findById);
router.route('/plates/:idPlate').post(menuController.create);
router.route('/:idMenu').put(menuController.findByIdAndUpdate);
router.route('/:idMenu').delete(menuController.findByIdAndDelete);
router.route('/:idMenu/plates/:idPlate').put(menuController.addPlate);
module.exports = router;
