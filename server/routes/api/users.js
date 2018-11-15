const express = require('express');
const router = express.Router();

var logger = require('../../config/logger');
const user_controller = require('../../controllers/userController');
const auth = require('../../config/auth.js');

router.use((req, res, next) => {
    logger.debug('Moving through Auth');

    if(req.path === '/login') {
        logger.debug('Auth found request for login')
        auth.login(req, res);
        return;
    }
    
    auth.checkToken(req, (valid) => {
        logger.verbose('Request is for protected route, checking token');
        if(valid){
            logger.debug('Token is valid');
            next();
        } else {
            logger.debug('Token is not valid');
            res.status(500).json({message: 'Token was not valid', valid: false});
        }
    });
});

router.get('/', user_controller.getAll);
router.get('/:email', user_controller.getOne);
router.post('/', user_controller.create);
router.delete('/:email', user_controller.delete);

module.exports = router;