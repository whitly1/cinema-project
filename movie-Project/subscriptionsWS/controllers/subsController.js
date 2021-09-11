const express = require('express');
const subsBl = require('../BL-models/subsBl');
const router = express.Router();

//  routing
router.route('/').get(async (req, resp) => {
    try {
        let data = await subsBl.getAllSubs();
        return resp.json(data);
    } catch (err) { console.log(err) };
});
router.route('/:id').get(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await subsBl.getSubById(id);
        return resp.json(data);
    } catch (err) { console.log(err) };
});
router.route('/:id').put(async (req, resp) => {
    try {
        let updatedSub = req.body;
        let id = req.params.id;
        let data = await subsBl.updateSub(id, updatedSub);
        return resp.json(data);
    } catch (err) { console.log(err) };
});
router.route('/').post(async (req, resp) => {
    try {
        let newSub = req.body;
        let data = await subsBl.createSub(newSub);
        return resp.json(data);
    } catch (err) { console.log(err) };
});
router.route('/:id').delete(async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await subsBl.deleteSub(id);
        return resp.json(data);
    } catch (err) { console.log(err) };
});
module.exports = router;