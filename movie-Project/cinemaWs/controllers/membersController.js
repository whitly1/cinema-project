const express = require('express')
const router = express.Router();
const membersDAL = require('../DAL/membersDAL')
// routing
router.route('/').get(async (req, resp) => {
    let data = await membersDAL.getAllMembers();
    return resp.json(data);
})
router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await membersDAL.getMemberbyId(id);
    return resp.json(data);
})
router.route('/').post(async (req, resp) => {
    let newMember = req.body;
    let data = await membersDAL.addMember(newMember);
    return resp.json(data);
})
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let updatedMember = req.body;
    let data = await membersDAL.updateMember(id, updatedMember);
    return resp.json(data);
})
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await membersDAL.deleteMember(id);
    return resp.json(data);
})
module.exports = router;