const { Router } = require('express');
const Controller = require('../controllers/index.controller.js');
const jwt = require('jsonwebtoken');
const router = Router();

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    const data = jwt.verify(token, process.env.KEY);
    req.userId = data._id;
    next();
}

router.get('/', Controller.helloWorld);
router.get('/getusers', verifyToken, Controller.getUsers);
router.post('/signup', Controller.signUp);
router.post('/signin', Controller.signIn);
router.get('/profile', verifyToken, Controller.getProfile);
router.post('/deleteUser', Controller.deleteUser);

module.exports = router;