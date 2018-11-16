const express = require('express');
const router = express.Router();

var logger = require('../../config/logger');
const user_controller = require('../../controllers/userController');
const auth = require('../../config/auth.js');

router.use((req, res, next) => {
    logger.verbose('Moving through Auth');
    if(req.path === '/login') {
        logger.verbose('Auth found request for login')
        auth.login(req, (result) => {
            logger.debug('Received result to callback function');
            if(result.token && result.token !== undefined) {
                logger.verbose('Login was successful');
                res.status(200).json(result);
            } else {
                logger.verbose('Login was unsuccessful');
                res.status(result.status).json({message: result.message});
            }
        });
        return;
    }

    logger.verbose('Request is for protected route, checking token');
    auth.checkToken(req, (valid) => {
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