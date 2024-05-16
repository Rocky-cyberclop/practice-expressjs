const User = require('../models/UserModel');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ users });
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ user });
    } catch (error) {
        if (error.code === 11000) {
            res.status(200).json({
                error: 'Create',
                message: 'Duplicate username',
            });
            return;
        } else {
            res.status(200).json({
                error: 'Create',
                message: 'Must provide username',
            });
            return;
        }
    }
    if (!req.body.username) {
        res.status(200).json({
            error: 'Create',
            message: 'Must provide username',
        });
        return;
    }
};

const getUser = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({
        username: username,
    });
    if (!user) {
        res.status(200).json({
            error: 'Blank',
            message: 'No user found',
        });
        return;
    }
    res.status(200).json({ user });
};
const deleteUser = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOneAndDelete({
        username: username,
    });
    if (!user) {
        res.status(200).send(
            'No user was found to delete!',
        );
    }
    res.status(200).json({ user });
};
const updateUser = async (req, res) => {
    const { username } = req.params;

    const user = await User.findOneAndUpdate(
        { username: username },
        req.body,
        {
            new: true,
        },
    );

    if (user) {
        res.status(200).send(
            'No user was found to update!',
        );
    }

    res.status(200).json({ user });
};

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
