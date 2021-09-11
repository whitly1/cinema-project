const axios = require('axios');
// functions
const getAllSubscription = async () => {
    let resp = await axios.get('http://localhost:8000/subscriptions')
    let subscriptions = resp.data
    return subscriptions
}
const getSubscriptionById = async (id) => {
    let resp = await axios.get(`http://localhost:8000/subscriptions/${id}`)
    let subscription = resp.data
    return subscription
}
const addSubscription = async (newSubscription) => {
    let resp = await axios.post('http://localhost:8000/subscriptions', newSubscription)
    let subscription = resp.data
    return subscription
}
const updateSubscription = async (id, updatedSubscription) => {
    let resp = await axios.put(`http://localhost:8000/subscriptions/${id}`, updatedSubscription)
    let subscription = resp.data
    return subscription
}
const deleteSubscription = async (id) => {
    let resp = await axios.delete(`http://localhost:8000/subscriptions/${id}`)
    let subscription = resp.data
    return subscription
}
module.exports = { getAllSubscription, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription }