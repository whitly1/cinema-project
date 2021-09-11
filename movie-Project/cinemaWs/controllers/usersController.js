const express = require('express');
const router = express.Router();
const usersBl = require('../BL-models/usersBl');

// routing
router.route('/').get(async (req, resp) => {
    try {
        let data = await usersBl.getAllUsers();
        return resp.json(data);
    } catch (err) {
        console.log(err);
    };
})
router.route('/:id').get(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await usersBl.getUserById(id);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
router.route('/').post(async (req, resp) => {
    try {
        let newUser = req.body;
        let data = await usersBl.addUser(newUser);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    };
})
router.route('/:id').put(async (req, resp) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;
        let data = await usersBl.updateUser(id, updatedUser);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
router.route('/:id').delete(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await usersBl.deleteUser(id);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;