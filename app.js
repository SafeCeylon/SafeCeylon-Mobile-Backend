const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoUrl = 'mongodb+srv://itsaeox:admin@cluster0.qjyfbx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const JWT_SECRET = 'G7xK2jM9nQ6L8cZ4bT3VwYfR0pXdA1U';

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

require('./UserDetails');
const User = mongoose.model('UserInfo');

app.get('/', (req, res) => {
    res.send({status: 'Started'});
});

app.post('/register', async(req, res) => {
    const {fullName, nic, mobileNumber, email, password} = req.body;

    const oldUser = await User.findOne({email});

    const hashedPassword = await bcrypt.hash(password, 12);

    if(oldUser) {
        return res.send({status: 409, data: 'User already exists!'});
    } else {
        try {
            await User.create({fullName, nic, mobileNumber, email, password: hashedPassword});
            res.send({status: 200, data: 'User registered successfully!'});
        } catch(err) {
            res.send({status: 'error', data: err});
        }
    }
});

app.post('/login', async(req, res) => {
    const {email, password} = req.body; 
    const oldUser = await User.findOne({email});

    if(!oldUser) {
        return res.send({status: 404, data: 'User not found!'});
    } 

    if(!await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({email:oldUser.email}, JWT_SECRET);

        if(res.status(201)) {
            res.send({status: 201, data: 'User logged in successfully!', token});
        } else {
            res.send({status: 401, data: 'Invalid credentials!'});
        }
    }
});

app.listen(3000, () => {
    console.log('Server started');
});