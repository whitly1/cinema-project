const axios = require('axios');
// functions
const getAllMembers = async () => {
    let resp = await axios.get('http://localhost:8000/members');
    let members = resp.data
    return members
}
const getMemberbyId = async (id) => {
    let resp = await axios.get(`http://localhost:8000/members/${id}`)
    let member = resp.data
    return member
}
const addMember = async (newMember) => {
    let resp = await axios.post('http://localhost:8000/members', newMember);
    let member = resp.data
    return member
}
const updateMember = async (id, updatedMember) => {
    let resp = await axios.put(`http://localhost:8000/members/${id}`, updatedMember);
    let member = resp.data
    return member
}
const deleteMember = async (id) => {
    let resp = await axios.delete(`http://localhost:8000/members/${id}`)
    let member = resp.data
    return member
}
module.exports = { getAllMembers, getMemberbyId, addMember, updateMember, deleteMember }