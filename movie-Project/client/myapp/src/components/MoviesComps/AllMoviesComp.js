import React, { useContext, useEffect, useState } from 'react'
import { Context } from './MoviesContext'
import MovieComp from './MovieComp'
import moviesUtils from '../utils/moviesUtils'
import SearchMovieComp from './SearchMovieComp'
import Grid from '@material-ui/core/Grid'
import { Container, CssBaseline, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import subscriptionsUtils from '../utils/subscriptionsUtils'
const AllMoviescomp = (props) => {
    const [movies, setMovies] = useContext(Context);
    const [searchData, setSearchData] = useState("");
    const [isFind, setIsFind] = useState(false);

    let filtered = [];
    // gets the search input and if the search input exists,renders only the movies the have the search input in their name
    useEffect(async () => {
        let moviesToShow = await moviesUtils.getAllMovies();
        if (searchData) {
            if (isFind) {
                setIsFind(false);
                moviesToRender = moviesToShow.forEach(movie => {
                    let name = movie.name;
                    let lowerName = name.toLowerCase();
                    if (lowerName.includes(searchData)) {
                        filtered = [...filtered, movie];
                        setMovies(filtered);
                    }
                })
            }
        }
        //    if  the page comes with a specific movie id render only that movie
        else if (props.match.params.id) {
            let movie = await moviesUtils.getMovieById(props.match.params.id);
            setMovies([...movies, movie]);

        }
        // if the search input is empty or find button is not pressed renders all the movies
        else {
            let movies = await moviesUtils.getAllMovies();
            setMovies(movies);
        }
    }, [searchData, isFind]);
    let moviesToRender;
    moviesToRender = movies.map((movie, i) => {
        return <div key={i}><MovieComp movie={movie} isDelete={async (id) => {
            await moviesUtils.deleteMovie(id);
            await subscriptionsUtils.EraseMovie(id)
            let movies = await moviesUtils.getAllMovies();
            setMovies(movies);
        }} />
        </div>
    })
    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
        },
        button: {
            color: "#8A2BE2",
            top: "15%"
        }
    }))
    const classes = useStyles()
    return (
        <div style={{ border: "3px solid black" }}>
            <CssBaseline />
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container  >
                    <Grid item>
                        <SearchMovieComp getSearchData={(data) => { setSearchData(data) }} />
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} variant="outlined" color="primary" value="find" onClick={() => { setIsFind(true) }}>Find</Button>
                    </Grid>
                </Grid>
            </Container>
            {moviesToRender}
        </div>
    )
}
export default AllMoviescomp