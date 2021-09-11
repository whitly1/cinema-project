import axios from 'axios'
const getUsers = async () => {
    let resp = await axios.get('http://localhost:8001/cinema/users');
    let users = resp.data;
    return users;
};
const getAllData = async () => {
    let resp = await axios.get('http://localhost:8001/cinema/users')
    let users = resp.data
    let usersJsonResp = await axios.get('http://localhost:8001/cinema/usersJson')
    let usersJson = usersJsonResp.data
    let permissionsJsonResp = await axios.get('http://localhost:8001/cinema/permissionsJson')
    let permissionsJson = permissionsJsonResp.data
    return { users, usersJson, permissionsJson }
}


export default { getUsers, getAllData }