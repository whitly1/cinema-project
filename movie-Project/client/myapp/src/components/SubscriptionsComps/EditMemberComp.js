import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { membersContext } from './membersContext'
import subscriptionsUtils from '../utils/subscriptionsUtils'
import { CssBaseline, TextField, Card, Grid, Button, CardContent, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const EditMemberComp = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [members, setMembers] = useContext(membersContext)
    const history = useHistory();
    let id = props.match.params.id;
    const useStyles = makeStyles((theme) => ({
        button: {
            left: "45%"
        }
    }));
    const classes = useStyles();
    // gets all the members data

    useEffect(() => {
        let member = members.find(member => member._id == id)
        setName(member.name)
        setEmail(member.email)
        setCity(member.city)
    }, [])

    // updates the member

    const updateMember = async () => {
        let updatedMember = {
            name: name,
            email: email,
            city: city
        }
        await subscriptionsUtils.updateMember(id, updatedMember);
        history.push("/MainPage/SubscriptionsPage/AllMembersPage");
    }
    return (
        <div>
            <CssBaseline />
            <Grid>
                <Grid item>
                    <Card>
                        <span><b>Edit Member</b></span><br />
                        <CardContent>
                            <TextField
                                variant="outlined"
                                label="Name"
                                name="Name"
                                autoComplete="Name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            /><br /><br />
                            <TextField
                                variant="outlined"
                                label="Email"
                                name="Email"
                                autoComplete="Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            /><br /><br />
                            <TextField
                                variant="outlined"
                                label=" City"
                                name=" City"
                                autoComplete=" City"
                                value={city}
                                onChange={(e) => { setCity(e.target.value) }}
                            /><br /><br />
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" onClick={updateMember}>Update</Button>
                            <Button className={classes.button} variant="outlined" onClick={() => { history.push("/MainPage/SubscriptionsPage/AllMembersPage") }}>cancel</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            {/* without design */}
            {/* <span><b>Edit Member</b></span><br />
            Name: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
            Email: <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
            City: <input type="text" value={city} onChange={(e) => { setCity(e.target.value) }} /><br />
            <input type="button" value="Update" onClick={updateMember} />
            <input type="button" value="cancel" onClick={() => { history.push("/MainPage/SubscriptionsPage/AllMembersPage") }} /> */}
        </div>
    )
}
export default EditMemberComp