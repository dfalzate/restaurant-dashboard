const router = require('express').Router();
const plateController = require('../controllers/plate.controller');

router.route('/').get(plateController.find);
router.route('/:id').get(plateController.findById);
router.route('/').post(plateController.create);
router.route('/:id').put(plateController.finByIdAndUpdate);
router.route('/:id').delete(plateController.findByIdAndDelete);

module.exports = router;
