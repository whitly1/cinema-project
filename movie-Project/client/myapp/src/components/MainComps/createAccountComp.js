import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import usersUtils from '../utils/usersUtils';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(9, 6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const CreateAccountComp = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [wrongName, setWrongName] = useState(false)
    const history = useHistory();

    // this function is called only if wrong name is true,
    // wrong name is true when no exisiting username matches the 
    // username in the input.

    useEffect(() => {
        if (wrongName) {
            alert("username is wrong or doesnt exist");
        }
    }, [wrongName])

    const createAccount = async () => {
        let users = await usersUtils.getAllUsers()
        // check if the user name exisits in collection
        setWrongName(users.every((user) => user.username != username));
        // check if user has typed in a password and if so, the function 
        // updates the existing user in the collection
        if (password) {
            users.forEach(async user => {
                if (user.username == username) {
                    let updatedUser = {
                        id: user._id,
                        username: user.username,
                        password: password
                    }
                    let id = user._id;
                    await usersUtils.updateUser(id, updatedUser)
                    history.push('/')

                }

            });
        } else {
            alert("fill new password");
        }
    }
    return (
        <div>
            <Paper className={classes.paper} elevation={6} square>
                <h1>Create an Account</h1>
                <TextField
                    variant="outlined"
                    required
                    label="user name"
                    name="user name"
                    autoComplete="user name"
                    onChange={e => {
                        setUsername(e.target.value)
                        setWrongName(false);
                    }} /><br />
                <TextField
                    variant="outlined"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                /><br />
                <Grid container style={{ marginLeft: "90%" }}>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={createAccount}>create</Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={() => { history.push('/') }}>cancel</Button>
                    </Grid>
                </Grid>

            </Paper>

        </div>
    )
}
export default CreateAccountComp