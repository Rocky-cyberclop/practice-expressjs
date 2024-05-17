const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Username is required'],
    },
    fullname: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    },
    projects: {
        type: [String],
        default: [],
    },
    activeYn: {
        type: String,
        enum: {
            values: ['Y', 'N'],
            message: 'Value must is Y or N',
        },
        default: 'Y',
    },
});

module.exports = mongoose.model(
    'User',
    UserSchema,
);
