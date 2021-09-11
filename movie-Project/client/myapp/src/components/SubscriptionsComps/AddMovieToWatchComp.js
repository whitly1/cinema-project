import React, { useEffect, useState } from 'react'
import moviesUtils from '../utils/moviesUtils'
import subscriptionsUtils from '../utils/subscriptionsUtils'
const AddMovieToWatchComp = (props) => {
    const [movies, setMovies] = useState([])
    const [dateToWatch, setDateToWatch] = useState()
    const [newMovieId, setNewMovieId] = useState("")
    let optionToRender;

    // get all the movies in the collection

    useEffect(async () => {
        let allMovies = await moviesUtils.getAllMovies();
        setMovies(allMovies);
    }, [])

    let options;
    if (movies) {
        options = [...movies]
        options = options.filter(option => !props.moviesWatched.find(watched => watched.name === option.name))
    }
    optionToRender = options.map((movie) => {
        return <option value={movie._id} key={movie._id}>{movie.name}</option>
    })
    const addMovieToWatch = async () => {

        // check if sub doesnt exist and creates a new one

        if (props.sub == undefined) {
            if (newMovieId && dateToWatch) {
                let newMovie = {
                    movieId: newMovieId,
                    dateOfMovie: dateToWatch
                }
                let newSub = {
                    memberId: props.memberId,
                    movies: []
                }
                newSub.movies = [...newSub.movies, newMovie]
                props.updateMovies(newSub.movies);
                await subscriptionsUtils.addSub(newSub);
            }
            // add a new movie to existing sub
        } else {
            if (newMovieId && dateToWatch) {
                let updatedSub = props.sub
                let newMovie = {
                    movieId: newMovieId,
                    dateOfMovie: dateToWatch
                }

                updatedSub.movies = [...updatedSub.movies, newMovie]
                await subscriptionsUtils.updateSub(props.sub._id, updatedSub);
                props.updateMovies(true);
            }

        }

        // clears the movie id -fixes a bug when you dont pick a movie and the previous movie is added

        setNewMovieId("");
    }

    // get the date of today and set it as the min date for watching a movie

    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    let finalDate = year + '-' + month + '-' + day
    return (
        <div style={{ border: "3px solid red" }}>
            <p>
                <span><b>Add a New Movie</b></span><br />
                <select name="movies" id="movies" onChange={(e) => { setNewMovieId(e.target.value) }}>
                    <option value='choose a movie'>choose a movie</option>
                    {optionToRender}
                </select>
                <input type="date" min={finalDate} onChange={(e) => { setDateToWatch(e.target.value) }} /><br />
                <input type="button" value="Subscribe" onClick={addMovieToWatch} />
            </p>
        </div>
    )
}
export default AddMovieToWatchComp