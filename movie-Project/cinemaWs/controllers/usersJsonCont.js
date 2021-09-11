const express = require('express');
const router = express.Router();
const usersDAL = require('../DAL/usersJsonDal');


// routing
router.route('/').get(async (req, resp) => {
    try {
        let data = await usersDAL.getAllUsers();
        return resp.json(data);
    } catch (err) {
        console.log(err)
    }
})
router.route('/:id').get(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await usersDAL.getUserById(id);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }

})
router.route('/').post(async (req, resp) => {
    try {
        let newUser = req.body;
        let data = await usersDAL.addUser(newUser);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
router.route('/:id').put(async (req, resp) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;
        let data = await usersDAL.updateUser(id, updatedUser);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
router.route('/:id').delete(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await usersDAL.deleteUser(id);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;