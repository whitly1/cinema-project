import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import EditUserComp from './EditUserComp'
import AddUserComp from './AddUserComp';
import AllUsersComp from './AllUsersComp'
import Button from '@material-ui/core/Button'
const UserManagementComp = () => {
    const history = useHistory()
    let allBtnColor = "outlined"
    let addBtnColor = "outlined"
    if (window.location.pathname.includes("AllUsersPage")) {
        allBtnColor = "contained";
    };
    if (window.location.pathname.includes("AddUserPage")) {
        addBtnColor = "contained";
    };
    return (
        <div style={{ border: "2px solid black" }}>
            <div style={{ width: "1000px" }}>
                <h1>Users</h1>
                <div>
                    <Button variant={allBtnColor} color="primary" value="all Users" onClick={() => { history.push("/MainPage/UserManagementPage/AllUsersPage") }} >All Users</Button>
                    <Button variant={addBtnColor} color="primary" value="add Users" onClick={() => { history.push("/MainPage/UserManagementPage/AddUserPage") }} >Add Users</Button>
                </div>
                <Switch>
                    <Route path="/MainPage/UserManagementPage/AllUsersPage" component={AllUsersComp} />
                    <Route path="/MainPage/UserManagementPage/EditUserPage/:id" component={EditUserComp} />
                    <Route path="/MainPage/UserManagementPage/AddUserPage" component={AddUserComp} />
                </Switch>
            </div>
        </div>
    )
}
export default UserManagementComp