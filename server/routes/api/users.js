const express = require('express');
const router = express.Router();

const user_controller = require('../../controllers/userController');

router.get('/', user_controller.getAll);
router.get('/:userId', user_controller.getOne);
router.post('/', user_controller.create);
router.put('/:userId', user_controller.update);
router.delete('/:userId', user_controller.delete);

module.exports = router;