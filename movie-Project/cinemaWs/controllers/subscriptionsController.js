const express = require('express');
const router = express.Router();
const subscriptionsDAL = require('../DAL/subscriptionsDAL');
// routing
router.route('/').get(async (req, resp) => {
    let data = await subscriptionsDAL.getAllSubscription();
    return resp.json(data);
})
router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await subscriptionsDAL.getSubscriptionById(id);
    return resp.json(data);
})
router.route('/').post(async (req, resp) => {
    let newSubscription = req.body;
    let data = await subscriptionsDAL.addSubscription(newSubscription);
    return resp.json(data);
})
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let updatedSubscription = req.body;
    let data = await subscriptionsDAL.updateSubscription(id, updatedSubscription);
    return resp.json(data);
})
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await subscriptionsDAL.deleteSubscription(id);
    return resp.json(data);
})
module.exports = router;