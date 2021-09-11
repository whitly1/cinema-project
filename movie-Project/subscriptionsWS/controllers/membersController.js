const express = require('express');
const router = express.Router();
const membersBl = require('../BL-models/membersBl');

// routing
router.route('/').get(async (req, resp) => {
    try {
        let data = await membersBl.getAllMembers();
        return resp.json(data);
    } catch (err) {
        console.log(err);
    };
});
router.route('/:id').get(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await membersBl.getMemberById(id);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    }
})
router.route('/:id').put(async (req, resp) => {
    try {
        let id = req.params.id;
        let member = req.body;
        let data = await membersBl.updateMember(id, member);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    };
});
router.route('/').post(async (req, resp) => {
    try {
        let newMember = req.body;
        let data = await membersBl.createMember(newMember);
        return resp.json(data);
    } catch (err) { console.log(err) }
});
router.route('/:id').delete(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await membersBl.deleteMember(id);
        return resp.json(data);
    } catch (err) {
        console.log(err);
    };
});
module.exports = router;