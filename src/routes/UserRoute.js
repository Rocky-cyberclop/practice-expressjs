const express = require('express');
const router = express.Router();

const {
    insertUser,
    searchUser,
    updateUser,
    deleteUser,
} = require('../controllers/UserController');

router.route('/insert').post(insertUser);
router
    .route('/:username')
    .patch(updateUser)
    .delete(deleteUser);
router.route('/search').get(searchUser);

module.exports = router;
