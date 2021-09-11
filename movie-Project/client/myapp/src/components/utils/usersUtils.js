import axios from 'axios'
const getAllUsers = async () => {
    let resp = await axios.get('http://localhost:8001/cinema/users');
    let users = resp.data;
    return users;
}

const getUserById = async (id) => {
    let resp = await axios.get(`http://localhost:8001/cinema/users/${id}`);
    let user = resp.data;
    let usersJsonResp = await axios.get(`http://localhost:8001/cinema/usersJson/${id}`);
    let usersJson = usersJsonResp.data;
    let permissionsJsonResp = await axios.get(`http://localhost:8001/cinema/permissionsJson/${id}`);
    let permissionsJson = permissionsJsonResp.data;
    let userJson = usersJson.find(userJson => userJson.id == user._id);
    let permissions = permissionsJson.find(permissions => permissions.id == user._id);
    let userToSend = {
        id: user._id,
        username: user.username,
        password: user.password,
        firstName: userJson.firstName,
        lastName: userJson.lastName,
        sessionTimeOut: userJson.sessionTimeOut,
        createdData: userJson.createdData,
        permissions: permissions.permissions
    };
    return userToSend;
}

const getUsers = async () => {
    let users = await getAllUsers();
    let usersJsonResp = await axios.get('http://localhost:8001/cinema/usersJson');
    let usersJson = usersJsonResp.data;
    let permissionsJsonResp = await axios.get('http://localhost:8001/cinema/permissionsJson');
    let permissionsJson = permissionsJsonResp.data;
    let newUsers = users.map(user => {
        let newUser;
        let userJson = usersJson.find(userJson => userJson.id == user._id);
        let permissions = permissionsJson.find(permissions => permissions.id == user._id);
        return newUser = {
            id: user._id,
            username: user.username,
            firstName: userJson.firstName,
            lastName: userJson.lastName,
            sessionTimeOut: userJson.sessionTimeOut,
            createdData: userJson.createdData,
            permissions: permissions.permissions
        }
    })
    return newUsers;
}

const deleteUser = async (id) => {
    let resp = await axios.delete(`http://localhost:8001/cinema/users/${id}`);
    return resp.data;
}
const saveUser = async (newUser) => {
    let resp = await axios.post('http://localhost:8001/cinema/users', newUser);
    return resp.data;
}

const saveUserJson = async (newUserJson) => {
    let resp = await axios.post('http://localhost:8001/cinema/usersJson', newUserJson);
    return resp.data;
}

const savePermissions = async (newPermissions) => {
    let resp = await axios.post('http://localhost:8001/cinema/permissionsJson', newPermissions);
    return resp.data;
}

const updateUser = async (id, updatedUser) => {
    let resp = await axios.put(`http://localhost:8001/cinema/users/${id}`, updatedUser);
    return resp.data;
}

const updateUserJson = async (id, updatedUserJson) => {
    let resp = await axios.put(`http://localhost:8001/cinema/usersJson/${id}`, updatedUserJson);
    return resp.data;
}

const updatePermissions = async (id, updatedPermissionsJson) => {
    let resp = await axios.put(`http://localhost:8001/cinema/permissionsJson/${id}`, updatedPermissionsJson);
    return resp.data;
}

export default { getAllUsers, getUserById, getUsers, deleteUser, saveUser, saveUserJson, savePermissions, updateUser, updateUserJson, updatePermissions }