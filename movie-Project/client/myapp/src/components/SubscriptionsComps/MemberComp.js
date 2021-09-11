import React from 'react'
import { useHistory } from 'react-router-dom'
import MoviesWatchedComp from './MoviesWatchedComp'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CssBaseline, Button } from '@material-ui/core'
const MembersComp = (props) => {
    const history = useHistory();
    let userToParse = sessionStorage.getItem("user");
    let user = JSON.parse(userToParse);
    let editBtnTorender;
    let deleteBtnToRender;

    // checks if the user has permissions and renders buttons

    if (user.permissions.includes("update subs")) {
        editBtnTorender = <Button value="Edit" variant="outlined" onClick={() => {
            history.push(`/MainPage/SubscriptionsPage/EditMemberPage/${props.member._id}`);
        }}>
            <EditIcon />
            Edit
        </Button>
    }
    if (user.permissions.includes("delete subs")) {
        deleteBtnToRender = <Button variant="outlined" value="Delete"
            onClick={() => {
                props.isDelete(props.member._id)
            }}>
            <DeleteIcon />
            Delete
        </Button>
    }
    return (
        <div style={{ border: "2px solid black" }}>
            <CssBaseline />
            <span><b>{props.member.name}</b></span><br />
            Email:{props.member.email}<br />
            City:{props.member.city}<br />
            {editBtnTorender}{deleteBtnToRender}
            <MoviesWatchedComp memberId={props.member._id} />
        </div>
    )
}
export default MembersComp