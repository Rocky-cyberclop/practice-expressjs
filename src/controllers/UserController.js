const User = require('../models/UserModel');

const insertUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                error: 'Create',
                message: 'Duplicate username',
            });
        } else {
            res.status(400).json({
                error: 'Create',
                message: error.message,
            });
        }
    }
    return;
};

const updateUser = async (req, res) => {
    const { username } = req.params;
    const { activeYn } = req.body;
    if (
        activeYn &&
        activeYn !== 'Y' &&
        activeYn !== 'N'
    ) {
        res.status(400).json({
            error: 'Update',
            message:
                'isActive can only be Y or N',
        });
        return;
    }
    const user = await User.findOneAndUpdate(
        { username: username },
        req.body,
        {
            new: true,
        },
    );
    if (!user) {
        res.status(400).json({
            error: 'Update',
            message: 'No user found!',
        });
        return;
    }
    res.status(200).json(user);
    return;
};

const deleteUser = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOneAndDelete({
        username: username,
    });
    if (!user) {
        res.status(400).json({
            error: 'Delete',
            message: 'No user found!',
        });
        return;
    }
    res.status(200).json(user);
    return;
};

const searchUser = async (req, res) => {
    const searchInfo = req.query;
    let projects = searchInfo.projects;
    if (projects) {
        projects =
            typeof projects === 'string'
                ? [projects]
                : projects;
        searchInfo.projects = { $all: projects };
    }
    const users = await User.find(searchInfo);
    res.status(200).json(users);
    return;
};

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    searchUser,
};
