import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import moviesUtils from '../utils/moviesUtils'
import { CssBaseline, TextField, Card, Grid, CardContent, CardActions } from '@material-ui/core'
const AddMoviecomp = () => {
    const [name, setName] = useState("")
    const [genres, setGenres] = useState([])
    const [imgUrl, setImgUrl] = useState("")
    const [premiered, setPremiered] = useState("")
    const history = useHistory()
    //  addMovie to the collection
    // checks if a movie name already exists
    const addMovie = async (e) => {
        e.preventDefault();
        if (name.length == 0 || genres.length == 0 || imgUrl.length == 0 || premiered.length == 0) {
            alert("fill the data")
        }
        else {
            let genresToUpdate = genres
            // if user uses space instead of , it changes it to ,
            let newGenres = genresToUpdate.replace(/ /g, ',')
            // splits the input based on ,
            let finalGenres = newGenres.split(",")
            let newMovie = {
                name: name,
                genres: finalGenres,
                image: imgUrl,
                premiered: JSON.stringify(premiered)
            }
            let movies = await moviesUtils.getAllMovies();
            if (movies.find(movie => movie.name.toLowerCase() == name.toLowerCase())) {
                alert("name taken,change name")
            }
            else {
                await moviesUtils.addMovie(newMovie);
                history.push("/MainPage/MoviesPage/AllMoviesPage")
            }
        }
    }
    return (
        <form onSubmit={addMovie}>
            <div>
                <CssBaseline />
                <Grid >
                    <Grid item>
                        <Card>
                            <CardContent>
                                <TextField
                                    variant="outlined"
                                    required
                                    label="Name"
                                    name="Name"
                                    autoComplete="Name"
                                    onChange={(e) => { setName(e.target.value) }}
                                /><br /><br />
                                <TextField
                                    variant="outlined"
                                    required
                                    label="Genres"
                                    name="Genres"
                                    autoComplete="Genres"
                                    onChange={(e) => {
                                        setGenres(e.target.value)
                                    }}
                                /><br /><br />
                                <TextField
                                    variant="outlined"
                                    required
                                    label="imgUrl"
                                    name="imgUrl"
                                    autoComplete="imgUrl"
                                    onChange={(e) => { setImgUrl(e.target.value) }}
                                /><br /><br />
                                Preimiered:<input type="date" onChange={(e) => { setPremiered(e.target.value) }} /><br />
                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                {/* without the design */}
                {/* Name:<input type="text" onChange={(e) => { setName(e.target.value) }} /><br />
                Genres:<input type="text" onChange={(e) => {
                    let newGenres = e.target.value.split(",")
                    setGenres(newGenres)
                }} /><br />
                image url:<input type="text" onChange={(e) => { setImgUrl(e.target.value) }} /><br />
                Preimiered:<input type="date" onChange={(e) => { setPremiered(e.target.value) }} /><br /> */}
                <input type="submit" value="save" />
                <input type="button" value="cancel" onClick={() => { history.push("/MainPage/MoviesPage/AllMoviesPage") }} />
            </div>
        </form>
    )
}
export default AddMoviecomp