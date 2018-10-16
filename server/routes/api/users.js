const express = require('express');
const router = express.Router();

const user_controller = require('../../controllers/userController');

router.get('/', user_controller.getAll);
router.get('/:email', user_controller.getOne);
router.post('/', user_controller.create);
router.delete('/:email', user_controller.delete);
router.post('/login', user_controller.login);

module.exports = router;