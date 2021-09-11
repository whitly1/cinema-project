import React, { useEffect, useState } from 'react'
import usersUtils from '../utils/usersUtils'
import UserComp from './UserComp';
import { useHistory } from 'react-router-dom'
const AllUsersComp = () => {
    const history = useHistory()
    const [users, setUsers] = useState([])
    let usersToRender;
    // gets all of the users from the collection
    useEffect(async () => {
        let newUsers = await usersUtils.getUsers();
        setUsers(newUsers);
    }, [])
    // users to render is given a value twice.
    // the first time om its forst render in lines 33-47
    // every time users are updated useEffect rerenders the users list
    useEffect(() => {
        usersToRender = users.map((user, i) => {
            return <div key={i}><UserComp key={i} user={user}
                isEdit={(data) => {
                    if (data) {
                        history.push("/MainPage/UserManagementPage/EditUserPage");
                    }
                }}
                isDelete={async (data) => {
                    if (data) {
                        await usersUtils.deleteUser(user.id);
                        let updatedUsers = await usersUtils.getUsers();
                        setUsers(updatedUsers);
                    }
                }} /><br /></div>
        })
    }, [users]);
    usersToRender = users.map((user, i) => {
        return <div key={i}><UserComp key={i} user={user}
            isEdit={(data) => {
                if (data) {
                    history.push(`/MainPage/UserManagementPage/EditUserPage/${user.id}`);
                }
            }}
            isDelete={async (data) => {
                if (data) {
                    await usersUtils.deleteUser(user.id);
                    let updatedUsers = await usersUtils.getUsers();
                    setUsers(updatedUsers);
                }
            }} /><br /></div>
    })

    return (
        <div>
            <br />
            {usersToRender}
        </div>
    )
}
export default AllUsersComp