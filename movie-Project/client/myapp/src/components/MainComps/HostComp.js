import React from 'react'
import LoginComp from './LoginComp'
import { Route, Switch } from 'react-router-dom'
import MainComp from './MainPageComp'
import CreateAccountComp from './createAccountComp'
import '../css/style.css'
import { CssBaseline, Typography, Container } from '@material-ui/core'
// this comp  is at the top of the hierarchy of all the comps,
// from here we have a switch with routes to the login page,the create account page and 
// the main page 

const HostComp = () => {
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md" style={{ backgroundImage: "linear-gradient(to right, rgba(255,0,0,0), rgb(121, 0, 226))" }}>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Movies-Subscription Web Site</Typography>
            </Container>
            <Switch>
                <Route exact path="/" component={LoginComp} />
                <Route path="/MainPage" component={MainComp} />
                <Route path="/CreateAccountPage" component={CreateAccountComp} />
            </Switch>

        </div>

    )
}
export default HostComp