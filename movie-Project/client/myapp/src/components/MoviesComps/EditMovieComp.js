import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moviesUtils from '../utils/moviesUtils'
import { CssBaseline, TextField, Card, Grid, CardContent } from '@material-ui/core'
const EditMoviecomp = (props) => {
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [genres, setGenres] = useState([])
    const [imgUrl, setImgUrl] = useState("")
    const [premiered, setPremiered] = useState("")
    const history = useHistory()

    // gets all the data of the movie
    useEffect(async () => {
        let id = props.match.params.id;
        let movie = await moviesUtils.getMovieById(id);
        setName(movie.name);
        setTitle(movie.name);
        setGenres(movie.genres);
        setImgUrl(movie.image);
        setPremiered(movie.premiered.slice(0, 10));
    }, [])
    const updateMovie = async (e) => {
        e.preventDefault();
        let movies = await moviesUtils.getAllMovies()
        // check if updated name is taken by another movie in the collection
        // if the name hasnt been updated or it isnt taken the update will happen
        if (name.toLowerCase() == title.toLowerCase() || !movies.find(movie => movie.name.toLowerCase() == name.toLowerCase())) {
            let id = props.match.params.id;
            let genresToUpdate = genres
            // if user uses space instead of , it changes it to ,
            let newGenres = genresToUpdate.replace(/ /g, ',')
            // splits the input based on ,
            let finalGenres = newGenres.split(",")
            let updatedMovie = {
                name: name,
                genres: finalGenres,
                image: imgUrl,
                premiered: JSON.stringify(premiered)
            };
            await moviesUtils.updateMovie(id, updatedMovie);
            history.push("/MainPage/MoviesPage/AllMoviesPage");
        } else if (movies.find(movie => movie.name.toLowerCase() == name.toLowerCase())) {
            alert("name taken,change name")
        }
    }
    return (
        <form onSubmit={updateMovie}>
            <div>
                <h1>Edit Movie {title}</h1>
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
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                /><br /><br />
                                <TextField
                                    variant="outlined"
                                    required
                                    label=" Genres"
                                    name=" Genres"
                                    autoComplete=" Genres"
                                    value={genres}
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
                                    value={imgUrl}
                                    onChange={(e) => { setImgUrl(e.target.value) }}
                                /><br /><br />
                                Premiered:<input type="date" value={premiered} onChange={(e) => { setPremiered(e.target.value) }} /><br />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {/*without design  */}
                {/* Name:<input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                Genres:<input type="text" value={genres} onChange={(e) => {
                    if (e.target.value == " ") { e.target.value = "," }
                    let newGenres = e.target.value.split(",")
                    setGenres(newGenres)
                }} /><br />
                image url:<input type="text" value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} /><br />
                Premiered:<input type="date" value={premiered} onChange={(e) => { setPremiered(e.target.value) }} /><br /> */}
                <input type="submit" value="update" />
                <input type="button" value="cancel" onClick={() => { history.push("/MainPage/MoviesPage/AllMoviesPage") }} />
            </div>
        </form>
    )
}
export default EditMoviecomp