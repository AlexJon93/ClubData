const express = require('express');
const router = express.Router();

const user_controller = require('../../controllers/userController');
const auth = require('../../config/auth.js');

router.use((req, res, next) => {
    if(req.path === '/login') {
        auth.login(req, res);
        return;
    }
    
    auth.checkToken(req, (valid) => {
        if(valid){
            next();
        } else {
            res.redirect('/');
        }
    });
});

router.get('/', user_controller.getAll);
router.get('/:email', user_controller.getOne);
router.post('/', user_controller.create);
router.delete('/:email', user_controller.delete);

module.exports = router;