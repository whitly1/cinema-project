import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import { SubsContextProvider } from './subscriptionsContext'
import { MembersContextProvider } from './membersContext'
import AllMembersComp from './AllMembersComp'
import AddMemberComp from './AddMemberComp'
import EditMemberComp from './EditMemberComp'
import Button from '@material-ui/core/Button'

// get the user from session storage to check permissions,
// renders the button accordingly

const SubscriptionsComp = () => {
    let userToParse = sessionStorage.getItem("user");
    let user = JSON.parse(userToParse);
    let addBtnToRender;
    let btnColor = "outlined"
    let addBtnColor = "outlined"
    const history = useHistory()

    if (window.location.pathname.includes("AllMembersPage")) {
        btnColor = "contained";
    }
    if (window.location.pathname.includes("AddMemberPage")) {
        addBtnColor = "contained";
    }
    if (user) {
        if (user.permissions.includes("create subs")) {
            addBtnToRender = <Button variant={addBtnColor} color="primary" onClick={() => { history.push("/MainPage/SubscriptionsPage/AddMemberPage") }}>Add Members</Button>
        }
    }
    return (
        <div style={{ border: "2px solid black" }}>
            <span><b>Subscriptions</b></span><br />
            <Button variant={btnColor} color="primary" onClick={() => { history.push("/MainPage/SubscriptionsPage/AllMembersPage") }}>All Members</Button>
            {addBtnToRender}
            <Switch>
                <MembersContextProvider>
                    <SubsContextProvider>
                        <Route exact path="/MainPage/SubscriptionsPage/AllMembersPage" component={AllMembersComp}></Route>
                        <Route path="/MainPage/SubscriptionsPage/AllMembersPage/:id" component={AllMembersComp}></Route>
                        <Route path="/MainPage/SubscriptionsPage/AddMemberPage" component={AddMemberComp}></Route>
                        <Route path="/MainPage/SubscriptionsPage/EditMemberPage/:id" component={EditMemberComp}></Route>
                    </SubsContextProvider>
                </MembersContextProvider>
            </Switch>

        </div>
    )
}
export default SubscriptionsComp