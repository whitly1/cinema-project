import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import subscriptionsUtils from '../utils/subscriptionsUtils'
import moviesUtils from '../utils/moviesUtils'
import AddMovieToWatchComp from './AddMovieToWatchComp';
import { CssBaseline, Button } from '@material-ui/core'
const MoviesWatchedComp = (props) => {
    const [moviesWatched, setMoviesWatched] = useState([])
    const [moviesToUpdate, setMoviesToUpdate] = useState(false)
    const [addNewMovie, setAddNewMovie] = useState(false)
    const [sub, setSub] = useState({})

    let moviesWatchedToRender;
    let addMovieToRender;
    let subscribeBtnToRender;
    let userToParse = sessionStorage.getItem("user");
    let user = JSON.parse(userToParse);
    // shows the sub and updates the movies shown of the sub
    useEffect(async () => {
        // find the sub that belongs to the member
        let allSubs = await subscriptionsUtils.getAllSubs();
        let newMoviesWatched = [];
        let subToFind = allSubs.find(sub => sub.memberId == props.memberId);
        setSub(subToFind);
        // check if sub exists and if it has movies and puts all the subs movies to a new array
        if (subToFind != undefined) {
            if (subToFind.movies) {
                subToFind.movies.forEach(async (movie) => {
                    let movieToGet = await moviesUtils.getMovieById(movie.movieId);
                    let movieWatched = {
                        id: movieToGet._id,
                        name: movieToGet.name,
                        dateOfViewing: movie.dateOfMovie.slice(0, 10)
                    }
                    newMoviesWatched = [...newMoviesWatched, movieWatched]
                    setMoviesWatched([...newMoviesWatched])

                })
            }
        }
        setMoviesToUpdate(false);
    }, [moviesToUpdate]);
    // shows all the subs movies name and date of the subs viewing
    if (moviesWatched.length > 0) {
        moviesWatchedToRender = moviesWatched.map((movie) => {
            return <li key={movie.id}><Link to={`/MainPage/MoviesPage/AllMoviesPage/${movie.id}`}>{movie.name}</Link> {movie.dateOfViewing.slice(8).slice(0, 2) + "/" + movie.dateOfViewing.slice(5).slice(0, 2) + "/" + movie.dateOfViewing.slice(0, 4)}</li>
        })
    }
    // the subscribe to movie comp
    if (addNewMovie) {
        addMovieToRender = <AddMovieToWatchComp sub={sub} moviesWatched={moviesWatched} updateMovies={(data) => { setMoviesToUpdate(data) }} memberId={props.memberId} />
    }
    // the button
    if (user.permissions.includes("update subs")) {
        subscribeBtnToRender = <Button variant="outlined" onClick={() => { setAddNewMovie(!addNewMovie) }}>
            Subscribe to new movie
        </Button>
    }
    return (
        <div style={{ border: "2px solid black" }}>
            <CssBaseline />
            <span><b>Movies Watched</b></span><br />
            <ul>
                {moviesWatchedToRender}
            </ul>
            {subscribeBtnToRender}
            {addMovieToRender}
        </div>
    )
}
export default MoviesWatchedComp