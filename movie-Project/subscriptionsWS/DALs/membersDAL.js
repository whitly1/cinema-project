const axios = require('axios');
const getMembers = async () => {
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let oldMembers = resp.data;
    return (oldMembers);
}
module.exports = { getMembers }