const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://itsaeox:admin@cluster0.qjyfbx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});


app.get('/', (req, res) => {
    res.send({status: 'Started'});
});

app.listen(3003, () => {
    console.log('Server started');
});