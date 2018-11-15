const express = require('express');
const router = express.Router();

var logger = require('../../config/logger');
const user_controller = require('../../controllers/userController');
const auth = require('../../config/auth.js');

router.use((req, res, next) => {
    logger.verbose('Moving through Auth');

    if(req.path === '/login') {
        logger.verbose('Auth found request for login')
        auth.login(req, res);
        return;
    }
    
    auth.checkToken(req, (valid) => {
        logger.verbose('Request is for protected route, checking token');
        if(valid){
            logger.verbose('Token is not valid');
            next();
        } else {
            logger.verbose('Token is valid');
            res.redirect('/');
        }
    });
});

router.get('/', user_controller.getAll);
router.get('/:email', user_controller.getOne);
router.post('/', user_controller.create);
router.delete('/:email', user_controller.delete);

module.exports = router;