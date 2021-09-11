import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import subscriptionsUtils from '../utils/subscriptionsUtils'
import { CssBaseline, TextField, Card, Grid, Button, CardContent, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const AddMemberComp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const history = useHistory();
    // adds new member to the collection
    const useStyles = makeStyles((theme) => ({
        button: {
            left: "45%"
        }
    }));
    const classes = useStyles();
    const addMember = async () => {
        if (name.length == 0 || email.length == 0 || city.length == 0) {
            alert("fill the data")
        }
        else {
            let newMember = {
                name: name,
                email: email,
                city: city
            };
            await subscriptionsUtils.addMember(newMember);
            history.push("/MainPage/SubscriptionsPage/AllMembersPage");
        }

    }

    return (
        <div>

            <CssBaseline />
            <Grid>
                <Grid item>
                    <span><b>Add New Member</b></span><br />
                    <Card>
                        <CardContent>
                            <TextField
                                variant="outlined"
                                label="Name"
                                name="Name"
                                autoComplete="Name"
                                onChange={(e) => { setName(e.target.value) }}
                            /><br /><br />
                            <TextField
                                variant="outlined"
                                label="Email"
                                name="Email"
                                autoComplete="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            /><br /><br />
                            <TextField
                                variant="outlined"
                                label=" City"
                                name=" City"
                                autoComplete=" City"
                                onChange={(e) => { setCity(e.target.value) }}
                            /><br /><br />
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" onClick={addMember}>save</Button>
                            <Button className={classes.button} variant="outlined" onClick={() => { history.push("/MainPage/SubscriptionsPage/AllMembersPage") }}>cancel</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            {/* without design */}
            {/* Name: <input type="text" onChange={(e) => { setName(e.target.value) }} /><br />
            Email: <input type="text" onChange={(e) => { setEmail(e.target.value) }} /><br />
            City: <input type="text" onChange={(e) => { setCity(e.target.value) }} /><br />
            <input type="button" value="save" onClick={addMember} />
            <input type="button" value="cancel" onClick={() => { history.push("/MainPage/SubscriptionsPage/AllMembersPage") }} /> */}
        </div>
    )
}
export default AddMemberComp