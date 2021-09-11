import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import loginUtils from '../utils/loginUtils'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import image from '../css/cinema.jpg'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',

    },
    paper: {
        margin: theme.spacing(9, 6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const LoginComp = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notFound, setNotFound] = useState(true)
    const history = useHistory();


    useEffect(() => {
        // Can't perform a React state update on an unmounted component.
        // This is a no-op, but it indicates a memory leak in your application - Fixed By Joe
        alertNotFound()
        return () => {
            setUsername('')
            setPassword(password)
        }
    }, [notFound])
    const alertNotFound = () => {
        if (!notFound) {
            alert('username is wrong or doesnt exist')
        }
    }
    const login = async () => {
        // form validation
        if (username.length == 0 || password.length == 0) {
            alert("fill the data")
        }
        else {
            // if there is check for MATCH!
            let data = await loginUtils.getAllData();
            let users = data.users;
            let usersJson = data.usersJson;
            let permissionsJson = data.permissionsJson;
            let index;
            setNotFound(users.some((user) => user.username == username))
            // shaping user data to save in session storage
            users.forEach(user => {
                // checking if there is a username for the user in DB

                if (user.username == username) {
                    index = users.findIndex(user => user.username == username)
                    // checking if there is a password for the user in DB
                    if (user.password == password) {
                        let userPermissions = permissionsJson.find(permissions => permissions.id == user._id)
                        let userJson = usersJson.find(userJson => userJson.id == user._id)
                        let userToSend = {
                            id: user._id,
                            username: user.username,
                            password: user.password,
                            firstName: userJson.firstName,
                            lastName: userJson.lastName,
                            sessionTimeOut: userJson.sessionTimeOut,
                            permissions: userPermissions.permissions
                        }
                        sessionStorage.setItem("user", JSON.stringify(userToSend))
                        history.push('/MainPage')
                    }
                }
            })
            if (index != null) {
                if (users[index].password !== password) {
                    alert("wrong password")
                }
            }

        }
    }

    return (

        <Grid container >
            <CssBaseline />
            <Grid item xs={false} sm={4} md={3} className={classes.image} />
            <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <LockOutlinedIcon /> <br />
                    <span><b>Login Page</b></span><br /><br />
                    <TextField
                        variant="outlined"
                        required
                        label="user name"
                        name="user name"
                        autoComplete="user name"
                        onChange={e => {
                            setUsername(e.target.value)
                            setNotFound(true)
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
                    <Button color="primary" variant="contained" onClick={login}>login</Button><br />
                    New User?<Link to="/CreateAccountPage">Create Account</Link>
                </div>
            </Grid>
        </Grid>

    )
}
export default LoginComp