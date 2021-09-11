import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import usersUtils from '../utils/usersUtils'
const EditUserComp = (props) => {
    const history = useHistory()
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [sessionTimeOut, setSessionTimeOut] = useState('')
    const [permissions, setPermissions] = useState([])
    const [viewSubs, setViewSubs] = useState(false)
    const [createSubs, setCreateSubs] = useState(false)
    const [deleteSubs, setDeleteSubs] = useState(false)
    const [updateSubs, setUpdateSubs] = useState(false)
    const [viewMovies, setViewMovies] = useState(false)
    const [createMovies, setCreateMovies] = useState(false)
    const [deleteMovies, setDeleteMovies] = useState(false)
    const [updateMovies, setUpdateMovies] = useState(false)
    const [oldUsername, setOldUsername] = useState('')

    // for each permission is a use effect that checks if a check box is checked
    // if its checked, the function checks if the permission is already in the permissions array
    // if its not, the function adds the permission. if it is,
    // the function splits the permission out of the array

    useEffect(() => {
        if (viewSubs) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "view subs")) {
                    permissions.push("view subs")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("view subs")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "view subs")) {
                let index = permissions.findIndex(permissions => permissions == "view subs")
                permissions.splice(index, 1)
                setPermissions(permissions)
            }

        }
    }, [viewSubs])

    useEffect(() => {
        if (createSubs) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "create subs")) {
                    let newArray = [...permissions, "create subs"]
                    setPermissions(newArray)
                }
            } else {
                let newArray = [...permissions, "create subs"]
                setPermissions(newArray)

            }

        }
        else {
            if (permissions) {
                if (permissions.find(permissions => permissions == "create subs")) {
                    let index = permissions.findIndex(permissions => permissions == "create subs")
                    permissions.splice(index, 1)
                    setPermissions(permissions)
                }
            }
        }
    }, [createSubs])

    useEffect(() => {
        if (deleteSubs) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "delete subs")) {
                    let newArray = [...permissions, "delete subs"]
                    setPermissions(newArray)
                }
            } else {
                let newArray = [...permissions, "delete subs"]
                setPermissions(newArray)
            }
        }
        else {
            if (permissions) {
                if (permissions.find(permissions => permissions == "delete subs")) {
                    let index = permissions.findIndex(permissions => permissions == "delete subs")
                    permissions.splice(index, 1)
                    setPermissions(permissions)
                }
            }
        }
    }, [deleteSubs])

    useEffect(() => {
        if (updateSubs) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "update subs")) {
                    let newArray = [...permissions, "update subs"]
                    setPermissions(newArray)
                }
            } else {
                let newArray = [...permissions, "update subs"]
                setPermissions(newArray)
            }
        }
        else {
            if (permissions) {
                if (permissions.find(permissions => permissions == "update subs")) {
                    let index = permissions.findIndex(permissions => permissions == "update subs")
                    permissions.splice(index, 1)
                    setPermissions(permissions)
                }
            }
        }
    }, [updateSubs])

    useEffect(() => {
        if (viewMovies) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "view movies")) {
                    permissions.push("view movies")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("view movies")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "view movies")) {
                let index = permissions.findIndex(permissions => permissions == "view movies")
                permissions.splice(index, 1)
                setPermissions(permissions)
            }

        }
    }, [viewMovies])

    useEffect(() => {
        if (createMovies) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "create movies")) {
                    let newArray = [...permissions, "create movies"]
                    setPermissions(newArray)
                }
            } else {
                let newArray = [...permissions, "create movies"]
                setPermissions(newArray)
            }
        }
        else {
            if (permissions) {
                if (permissions.find(permissions => permissions == "create movies")) {
                    let index = permissions.findIndex(permissions => permissions == "create movies")
                    permissions.splice(index, 1)
                    setPermissions(permissions)
                }
            }
        }
    }, [createMovies])

    useEffect(() => {
        if (deleteMovies) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "delete movies")) {
                    let newArray = [...permissions, "delete movies"]
                    setPermissions(newArray)
                }
            } else {
                let newArray = [...permissions, "delete movies"]
                setPermissions(newArray)
            }
        }
        else {
            if (permissions) {
                if (permissions.find(permissions => permissions == "delete movies")) {
                    let index = permissions.findIndex(permissions => permissions == "delete movies")
                    permissions.splice(index, 1)
                    setPermissions(permissions)
                }
            }
        }
    }, [deleteMovies])

    useEffect(() => {
        if (updateMovies) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "update movies")) {
                    let newArray = [...permissions, "update movies"]
                    setPermissions(newArray)
                }
            } else {
                let newArray = [...permissions, "update movies"]
                setPermissions(newArray)
            }
        }
        else {
            if (permissions) {
                if (permissions.find(permissions => permissions == "update movies")) {
                    let index = permissions.findIndex(permissions => permissions == "update movies")
                    permissions.splice(index, 1)
                    setPermissions(permissions)
                }
            }
        }
    }, [updateMovies])

    useEffect(async () => {
        let newUsers = await usersUtils.getAllUsers()
        setUsers(newUsers)
        let id = props.match.params.id
        let user = await usersUtils.getUserById(id)
        setUser(user)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setUsername(user.username)
        setOldUsername(user.username)
        if (user.permissions.length > 0) {
            setPermissions(user.permissions)
        }
        setSessionTimeOut(user.sessionTimeOut)
        if (user.permissions.length > 0) {
            user.permissions.forEach(permissions => {
                switch (permissions) {
                    case "view subs":
                        setViewSubs(true)
                        break;
                    case "create subs":
                        setCreateSubs(true)
                        break;
                    case "update subs":
                        setUpdateSubs(true)
                        break;
                    case "delete subs":
                        setDeleteSubs(true)
                        break;
                    case "view movies":
                        setViewMovies(true)
                        break;
                    case "create movies":
                        setCreateMovies(true)
                        break;
                    case "update movies":
                        setUpdateMovies(true)
                        break;
                    case "delete movies":
                        setDeleteMovies(true)
                        break;
                }

            });
        }

    }, [])

    // this function update a user to the collection
    // checks if the new name is already taken
    // saves the data in user collection and userJson and permissionJson

    const updateUser = async (e) => {
        e.preventDefault();
        let users = await usersUtils.getAllUsers()
        if (username.toLowerCase() == oldUsername.toLowerCase() || !users.find(user => user.username.toLowerCase() == username.toLowerCase())) {
            let updatedUser = {
                _id: user.id,
                username: username,
                password: user.password
            }
            let updatedUserJson = {
                id: user.id,
                firstName: firstName,
                lastName: lastName,
                createdData: user.createdData,
                sessionTimeOut: sessionTimeOut
            }
            let updatedPermissions = {
                id: user.id,
                permissions: permissions
            }
            await usersUtils.updateUser(user.id, updatedUser)
            await usersUtils.updateUserJson(user.id, updatedUserJson)
            await usersUtils.updatePermissions(user.id, updatedPermissions)
            history.push("/MainPage/UserManagementPage/AllUsersPage")
        } else if (users.find(user => user.username.toLowerCase() == username.toLowerCase())) {
            alert("user name taken")
        }

    }
    let createdDataToRender;
    let nameToRender = user.firstName + " " + user.lastName
    if (user.createdData) {
        let createdDataYear = user.createdData.slice(1, 5)
        let createdDataMonth = user.createdData.slice(6, 8)
        let createdDataDay = user.createdData.slice(9, 11)
        createdDataToRender = createdDataDay + "/" + createdDataMonth + "/" + createdDataYear
    }
    return (
        <form onSubmit={updateUser}>
            <div>
                <h1>Edit User:{nameToRender}</h1>
                First Name:<input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} /><br />
                Last Name:<input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} /><br />
                Username:<input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} /><br />
                SessionTimeOut (Minutes):<input type="text" value={sessionTimeOut} onChange={(e) => { setSessionTimeOut(e.target.value) }} /><br />
                createdData:{createdDataToRender}<br />
                Permissions:<br />
                <ul>
                    <li>
                        View Subscriptions:<input type="checkbox" checked={viewSubs} onChange={() => {
                            setViewSubs(!viewSubs)
                        }} />
                    </li>
                    <li>
                        Create Subscriptions:<input type="checkbox" checked={createSubs} onChange={() => {
                            setCreateSubs(!createSubs)
                            if (!createSubs) {
                                if (!viewSubs) {
                                    setViewSubs(true)
                                }
                            }
                        }} />
                    </li>
                    <li>
                        Delete Subscriptions:<input type="checkbox" checked={deleteSubs} onChange={() => {
                            setDeleteSubs(!deleteSubs)
                            if (!deleteSubs) {
                                if (!viewSubs) {
                                    setViewSubs(true)
                                }
                            }
                        }} />
                    </li>
                    <li>
                        Update Subscriptions:<input type="checkbox" checked={updateSubs} onChange={() => {
                            setUpdateSubs(!updateSubs)
                            if (!updateSubs) {
                                if (!viewSubs) {
                                    setViewSubs(true)
                                }
                            }
                        }} />
                    </li>
                    <li>
                        View Movies:<input type="checkbox" checked={viewMovies} onChange={() => { setViewMovies(!viewMovies) }} />
                    </li>
                    <li>
                        Create Movies:<input type="checkbox" checked={createMovies} onChange={() => {
                            setCreateMovies(!createMovies)
                            if (!createMovies) {
                                if (!viewMovies) {
                                    setViewMovies(true)
                                }
                            }
                        }} />
                    </li>
                    <li>
                        Delete Movies:<input type="checkbox" checked={deleteMovies} onChange={() => {
                            setDeleteMovies(!deleteMovies)
                            if (!deleteMovies) {
                                if (!viewMovies) {
                                    setViewMovies(true)
                                }
                            }
                        }} />
                    </li>
                    <li>
                        Update Movies:<input type="checkbox" checked={updateMovies} onChange={() => {
                            setUpdateMovies(!updateMovies)
                            if (!updateMovies) {
                                if (!viewMovies) {
                                    setViewMovies(true)
                                }
                            }
                        }} />
                    </li>
                </ul><br />
                <input type="submit" value="Update" />
                <input type="button" value="Cancel" onClick={() => { history.push("/MainPage/UserManagementPage/AllUsersPage") }} />

            </div>
        </form>
    )
}
export default EditUserComp