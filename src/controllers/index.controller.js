const Controller = { }
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

Controller.helloWorld = (req, res) => {
    return res.json({ message: 'Hello' });
};

Controller.signUp = async (req, res) => {
    const { 
        name, 
        lastname, 
        username, 
        email, 
        password
    } = req.body;
    const newUser = new User({
        name,
        lastname,
        username,
        email,
        password
    });
    await newUser.save()
    .then(() => {
        return res.status(200).json({ message: 'Usuario registrado exitosamente' }); 
    })
    .catch((error) => {
        return res.json({ error });
    })
};

Controller.signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
    } else {
        if(user.password === password) {
            const token = jwt.sign({ _id: user._id }, process.env.KEY);
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    }
};

Controller.getUsers = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({ users });
};

Controller.getProfile = async (req, res) => {
    const user = await User.findById(req.userId);
    return res.status(200).json({ user });
};

Controller.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.body.id)
    .then(() => {
        return res.status(200).json({ message: 'Se ha borrado el perfil satisfactoriamente.' });
    }).catch(() => {
        return res.status(404).json({ message: 'No se ha encontrado al usuario.' });
    }); 
};

module.exports = Controller;