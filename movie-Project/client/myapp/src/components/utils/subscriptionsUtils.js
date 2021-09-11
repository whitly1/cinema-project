import axios from 'axios'
const getAllSubs = async () => {
    let resp = await axios.get('http://localhost:8001/subscriptions');
    return resp.data;
}

const getSubById = async (id) => {
    let subs = await getAllSubs();
    let sub = subs.filter(subs => subs.id == id);
    return sub;
}

const addSub = async (newSub) => {
    let resp = await axios.post('http://localhost:8001/subscriptions', newSub);
    return resp.data;
}

const updateSub = async (id, updatedSub) => {
    let resp = await axios.put(`http://localhost:8001/subscriptions/${id}`, updatedSub);
    return resp.data;
}

const deleteSub = async (id) => {
    let resp = await axios.delete(`http://localhost:8001/subscriptions/${id}`);
    return resp.data;
}

const getAllMembers = async () => {
    let resp = await axios.get('http://localhost:8001/members');
    return resp.data;
}

const getMemberNameById = async (id) => {
    let resp = await axios.get(`http://localhost:8001/members/${id}`);
    let name = resp.data.name;
    return name;
}

const deleteMember = async (id) => {
    let resp = await axios.delete(`http://localhost:8001/members/${id}`);
    return resp.data;
}

const addMember = async (newMember) => {
    let resp = await axios.post('http://localhost:8001/members', newMember);
    return resp.data;
}

const updateMember = async (id, updatedMember) => {
    let resp = await axios.put(`http://localhost:8001/members/${id}`, updatedMember);
    return resp.data;
}

const getMemberById = async (id) => {
    let resp = await axios.get(`http://localhost:8001/members/${id}`);
    return resp.data;
}
const EraseMovie = async (id) => {
    let subscriptions = await getAllSubs()
    subscriptions.forEach(async (sub) => {
        if (sub.movies.find(movie => movie.movieId == id)) {
            let index = sub.movies.findIndex(movie => movie.movieId == id)
            let newSub = sub
            newSub.movies.splice(index, 1)
            if (newSub.movies.length == 0) {
                await deleteSub(sub._id)
            }
            else {
                await updateSub(sub._id, newSub)
            }
        }
    })
}

export default { getAllSubs, getSubById, getAllMembers, getMemberById, getMemberNameById, deleteMember, addMember, updateMember, addSub, updateSub, deleteSub, EraseMovie }