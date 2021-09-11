import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CssBaseline, Button } from '@material-ui/core'
const UserComp = (props) => {
    let permissionsToRender;
    if (props.user.permissions.length > 0) {
        permissionsToRender = props.user.permissions.map((permission, i) => {
            return <span key={i}> {permission},</span>
        })
    }
    // shows the data
    let createdDataToRender;
    if (props.user.createdData) {
        let createdDataYear = props.user.createdData.slice(1, 5)
        let createdDataMonth = props.user.createdData.slice(6, 8)
        let createdDataDay = props.user.createdData.slice(9, 11)
        createdDataToRender = createdDataDay + "/" + createdDataMonth + "/" + createdDataYear
    }
    return (
        <div style={{ width: "1000px", border: "2px solid black" }}>
            <CssBaseline />
            < span > Name:{props.user.firstName} {props.user.lastName}</ span><br />
            <span>User Name:{props.user.username}</span><br />
            <span>SessionTimeOut (Minutes):{props.user.sessionTimeOut}</span><br />
            <span>Created data:{createdDataToRender}</span><br />
            <span>Permissions:</span><br />
            {permissionsToRender}<br />
            <Button variant="outlined" value="edit" onClick={() => { props.isEdit(true) }}>
                <EditIcon />
                Edit
            </Button>
            <Button variant="outlined" value="delete" onClick={() => { props.isDelete(true) }}>
                <DeleteIcon />
                Delete
            </Button>
        </div>
    )
}
export default UserComp