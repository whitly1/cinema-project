const express = require('express')
const router = express.Router();
const permissionsDAl = require('../DAL/permissionsDal')
// routing
router.route('/').get(async (req, resp) => {
    try {
        let data = await permissionsDAl.getAllPermissions();
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
router.route('/:id').get(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await permissionsDAl.getUserPermissions(id);
        return resp.json(data);
    } catch (err) {
        console.log(err)
    }
})
router.route('/').post(async (req, resp) => {
    try {
        let newPermissions = req.body;
        let data = await permissionsDAl.addPermissions(newPermissions);
        return resp.json(data);
    } catch (err) {
        console.log(err)
    }
})
router.route('/:id').put(async (req, resp) => {
    try {
        let id = req.params.id;
        let updatedPermissions = req.body;
        let data = await permissionsDAl.updatePermissions(id, updatedPermissions);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
router.route('/:id').delete(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await permissionsDAl.deletePermissions(id);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;