import React, { useEffect } from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import MoviesComp from '../MoviesComps/MoviesComp'
import SubscriptionsComp from '../SubscriptionsComps/SubscriptionsComp'
import UserManagement from '../UsersComps/UserManagement'
import Button from '@material-ui/core/Button'
import '../css/style.css'
import cinemaImg from '../css/cinema3.jpg'
import { useTheme } from '@material-ui/core/styles'
import { CssBaseline, Typography, Container, Card, CardMedia, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const MainComp = () => {
    const theme = useTheme();
    const history = useHistory();
    let userToParse = sessionStorage.getItem("user");
    let user = JSON.parse(userToParse);
    let btnToRender;
    let movieBtnToRender;
    let subscriptionsBtnToRender;
    let userBtnColor = "outlined"
    let movieBtnColor = "outlined"
    let subscriptionsBtnColor = "outlined"
    let nameToRender;
    useEffect(() => {
        // function that checks if user exists==if a login happened. if not,no matter what path the is in the url, it will go to login page
        if (sessionStorage.getItem("user") == null) {
            history.push("/")
        }
        // if a login did happen: sets a timer with the time from users sessionTimeOut.
        // when the timer ends, the website will go back to the login page and the user saved in session storage will be erased.Furthermore,at the end of the time the timer will be cleared
        else if (user.sessionTimeOut != "admin") {
            let timer = setTimeout(() => {
                sessionStorage.removeItem("user")
                alert("time expired")
                history.push("/")
            }, user.sessionTimeOut * 60000)

            return () => clearTimeout(timer)
        }
    }, [])
    // checking if a path has a specific phrase-the website goes to a different page, and if so a buttons background color will change accordingly
    if (window.location.pathname.includes("UserManagementPage")) { userBtnColor = "contained" };
    if (window.location.pathname.includes("MoviesPage")) { movieBtnColor = "contained" };
    if (window.location.pathname.includes("SubscriptionsPage")) { subscriptionsBtnColor = "contained" };
    if (user && window.location.pathname.includes("MainPage")) {
        nameToRender = <span><b>hello {user.firstName}</b></span>

        if (user.sessionTimeOut == "admin") {
            btnToRender = <Button variant={userBtnColor} color="primary" id="usersBtn" value="manage users" onClick={() => { history.push("/MainPage/UserManagementPage") }}>Manage Users</Button>
        }
        if (user.permissions.includes("view movies")) {
            movieBtnToRender = <Button variant={movieBtnColor} color="primary" value="Movies" onClick={() => { history.push("/MainPage/MoviesPage") }}>Movies </Button>
        }
        if (user.permissions.includes("view subs")) {
            subscriptionsBtnToRender = <Button variant={subscriptionsBtnColor} color="primary" id="subBtn" value="Subscriptions" onClick={() => history.push("/MainPage/SubscriptionsPage")}>Subscriptions</Button>
        }
    }
    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
        },
        cardGrid: {
            padding: '20px 0',
            marginLeft: "30%"

        },
        card: {
            height: `100%`,
            display: "flex",
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%',
            width: "800px",
            height: "500px",
        },
        cardContent: {
            flexGrow: 1
        }
    }))
    const classes = useStyles()
    let pictureToRender;
    if (!window.location.pathname.includes("MainPage/")) {
        pictureToRender = <Container className={classes.cardGrid} maxWidth="xl">
            <Grid container spacing={4}>
                <Grid item>
                    <Card className={classes.card}>
                        <CardMedia className={classes.cardMedia}
                            image={cinemaImg}
                            title={"Welcome To The Cinema"} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    }
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography variant="h5" align="center" color="textSecondary">{nameToRender}</Typography>
            </Container>
            <div>
                {movieBtnToRender}
                {subscriptionsBtnToRender}
                {btnToRender}
                <Button variant="outlined" color="primary" value="Log Out" onClick={() => {
                    sessionStorage.removeItem("user")
                    // sessionStorage.clear()
                    history.push("/")
                }}>Log Out</Button>
            </div>
            {pictureToRender}
            <Switch>
                <Redirect exact from="/MainPage/SubscriptionsPage" to="/MainPage/SubscriptionsPage/AllMembersPage" />
                <Redirect exact from="/MainPage/MoviesPage" to="/MainPage/MoviesPage/AllMoviesPage" />
                <Redirect exact from="/MainPage/UserManagementPage" to="/MainPage/UserManagementPage/AllUsersPage" />
                <Route path="/MainPage/MoviesPage" component={MoviesComp} />
                <Route path="/MainPage/SubscriptionsPage" component={SubscriptionsComp} />
                <Route path="/MainPage/UserManagementPage" component={UserManagement} />
            </Switch>
        </div>
    )
}
export default MainComp