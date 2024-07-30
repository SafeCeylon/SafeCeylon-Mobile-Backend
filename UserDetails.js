const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},{
    collection: 'UserInfo'
});
mongoose.model('UserInfo', UserDetailsSchema);