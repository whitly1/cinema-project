import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import AllMoviesComp from './AllMoviesComp'
import AddMovieComp from './AddMovieComp'
import EditMovieComp from './EditMovieComp'
import { ContextProvider } from './MoviesContext'
import Button from '@material-ui/core/Button'
const MoviesComp = () => {
    let userToParse = sessionStorage.getItem("user")
    let user = JSON.parse(userToParse)
    let addBtnToRender;
    let btnColor = "outlined"
    let addBtnColor = "outlined"
    const history = useHistory();

    // checking if a path has a specific phrase-the website goes to a different page, and if so a buttons background color will change accordingly

    if (window.location.pathname.includes("AllMoviesPage")) {
        btnColor = "contained"
    }
    if (window.location.pathname.includes("AddMoviePage")) {
        addBtnColor = "contained"
    }

    // checks if the user has permissions and renders buttons
    if (user) {
        if (user.permissions.includes("create movies")) {
            addBtnToRender = <Button variant={addBtnColor} color="primary" value="add Users" onClick={() => { history.push("/MainPage/MoviesPage/AddMoviePage") }} >Add Movie</Button>
        }
    }


    return (
        <div>
            <span><b>Movies</b></span><br />
            <Button variant={btnColor} color="primary" onClick={() => { history.push("/MainPage/MoviesPage/AllMoviesPage") }} >All Movies</Button>
            {addBtnToRender}
            <Switch>
                <ContextProvider>
                    <Route exact path="/MainPage/MoviesPage/AllMoviesPage" component={AllMoviesComp}></Route>
                    <Route path="/MainPage/MoviesPage/AllMoviesPage/:id" component={AllMoviesComp}></Route>
                    <Route path="/MainPage/MoviesPage/AddMoviePage" component={AddMovieComp}></Route>
                    <Route path="/MainPage/MoviesPage/EditMoviePage/:id" component={EditMovieComp}></Route>
                </ContextProvider>
            </Switch>
        </div>
    )
}
export default MoviesComp