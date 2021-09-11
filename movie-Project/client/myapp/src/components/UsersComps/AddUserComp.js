import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import usersUtils from '../utils/usersUtils'
const AddUserComp = () => {
    const history = useHistory()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [sessionTimeOut, setSessionTimeOut] = useState()
    const [permissions, setPermissions] = useState([])
    const [viewSubs, setViewSubs] = useState(false)
    const [createSubs, setCreateSubs] = useState(false)
    const [deleteSubs, setDeleteSubs] = useState(false)
    const [updateSubs, setUpdateSubs] = useState(false)
    const [viewMovies, setViewMovies] = useState(false)
    const [createMovies, setCreateMovies] = useState(false)
    const [deleteMovies, setDeleteMovies] = useState(false)
    const [updateMovies, setUpdateMovies] = useState(false)

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
                    permissions.push("create subs")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("create subs")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "create subs")) {
                let index = permissions.findIndex(permissions => permissions == "create subs")
                permissions.splice(index, 1)
                setPermissions(permissions)
            }

        }
    }, [createSubs])
    useEffect(() => {
        if (deleteSubs) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "delete subs")) {
                    permissions.push("delete subs")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("delete subs")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "delete subs")) {
                let index = permissions.findIndex(permissions => permissions == "delete subs")
                permissions.splice(index, 1)
                setPermissions(permissions)
            }

        }
    }, [deleteSubs])
    useEffect(() => {
        if (updateSubs) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "update subs")) {
                    permissions.push("update subs")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("update subs")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "update subs")) {
                let index = permissions.findIndex(permissions => permissions == "update subs")
                permissions.splice(index, 1)
                setPermissions(permissions)
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
                    permissions.push("create movies")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("create movies")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "create movies")) {
                let index = permissions.findIndex(permissions => permissions == "create movies")
                permissions.splice(index, 1)
                setPermissions(permissions)
            }

        }
    }, [createMovies])
    useEffect(() => {
        if (deleteMovies) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "delete movies")) {
                    permissions.push("delete movies")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("delete movies")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "delete movies")) {
                let index = permissions.findIndex(permissions => permissions == "delete movies")
                permissions.splice(index, 1)
                setPermissions(permissions)
            }

        }
    }, [deleteMovies])
    useEffect(() => {
        if (updateMovies) {
            if (permissions) {
                if (!permissions.find(permissions => permissions == "update movies")) {
                    permissions.push("update movies")
                    setPermissions(permissions)
                }
            } else {
                permissions.push("update movies")
                setPermissions(permissions)
            }
        }
        else {
            if (permissions.find(permissions => permissions == "update movies")) {
                let index = permissions.findIndex(permissions => permissions == "update movies")
                permissions.splice(index, 1)
                setPermissions(permissions)
            }

        }
    }, [updateMovies])
    // this function add a new user to the collection
    // checks if the new name is already taken
    // saves the data in user collection and userJson and permissionJson
    const addUser = async (e) => {
        e.preventDefault()
        let users = await usersUtils.getAllUsers()
        if (username.length == 0) {
            alert("fill the data")
        }
        else if (users.find(user => user.username.toLowerCase() == username.toLowerCase())) {
            alert("user name taken")
        } else {
            let newUser = {
                username: username,
                password: ""
            }
            let docAdded = await usersUtils.saveUser(newUser)
            let today = new Date();
            let newUserJson = {
                id: docAdded._id,
                firstName: firstName,
                lastName: lastName,
                createdData: JSON.stringify(today),
                sessionTimeOut: sessionTimeOut
            }
            let newPermissions = {
                id: docAdded._id,
                permissions: permissions
            }
            await usersUtils.saveUserJson(newUserJson)
            await usersUtils.savePermissions(newPermissions)
            history.push("/MainPage/UserManagementPage/AllUsersPage")
        }
    }
    return (
        <form onSubmit={addUser}>
            <div>
                First Name:<input type="text" onChange={(e) => { setFirstName(e.target.value) }} /><br />
                Last Name:<input type="text" onChange={(e) => { setLastName(e.target.value) }} /><br />
                Username:<input type="text" onChange={(e) => { setUsername(e.target.value) }} /><br />
                SessionTimeOut (Minutes):<input type="number" onChange={(e) => { setSessionTimeOut(e.target.value) }} /><br />
                Permissions:<br />
                {/* each permission on click changes the state to the oppisite
                also some check boxes check other checkboxes as well */}
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
                <input type="submit" value="Save" />
                <input type="button" value="Cancel" onClick={() => { history.push("/MainPage/UserManagementPage/AllUsersPage") }} />

            </div>
        </form>
    )
}
export default AddUserComp