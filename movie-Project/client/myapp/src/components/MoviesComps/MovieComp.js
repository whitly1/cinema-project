import React from 'react'
import SubsWatchedComp from './SubsWatchedComp'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Card, CardMedia, CardContent, Container, CssBaseline, Typography, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// shows the movies data
const MovieComp = (props) => {
    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
        },
        cardGrid: {
            padding: '20px 0'
        },
        card: {
            height: `100%`,
            display: "flex",
            flexDirection: 'column'
        },
        cardMedia: {
            paddingTop: '56.25%',
            width: "300px",
            height: "400px",
        },
        cardContent: {
            flexGrow: 1
        }
    }))
    const classes = useStyles()
    let userToParse = sessionStorage.getItem("user")
    let user = JSON.parse(userToParse)
    let imageToRender;
    let genresToRender;
    let editBtnToRender;
    let deleteBtnToRender;
    const history = useHistory();

    imageToRender = <img src={props.movie.image} style={{ width: "100px", marginLeft: "10%" }} />
    genresToRender = props.movie.genres.map((genre, i) => {
        return <span key={i}>"{genre}", </span>
    })
    // checks if the user has permissions and renders buttons
    if (user.permissions.includes("update movies")) {
        editBtnToRender = <Button value="Edit" variant="contained" onClick={() => { history.push(`/MainPage/MoviesPage/EditMoviePage/${props.movie._id}`) }}>
            <EditIcon />
            Edit
        </Button>

    }
    if (user.permissions.includes("delete movies")) {
        deleteBtnToRender = <Button value="Delete" variant="contained" onClick={() => { props.isDelete(props.movie._id) }} >
            <DeleteIcon />
            Delete
        </Button>
    }
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <CssBaseline />
            <Grid container spacing={4}>
                <Grid item>
                    <Card className={classes.card}>
                        <Grid container spacing={4}>
                            <Grid item>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={props.movie.image}
                                    title={props.movie.name}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {props.movie.name} , {props.movie.premiered.slice(0, 4)}<br />
                                        genres:{genresToRender}<br /><br />
                                    </Typography>
                                    <CardActions>
                                        {editBtnToRender}{deleteBtnToRender}
                                    </CardActions>
                                </CardContent>
                            </Grid>
                            <Grid item>
                                <CardContent className={classes.cardContent}>
                                    <SubsWatchedComp movie={props.movie} /><br />
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            {/* this is the same presentation without the */}
            {/* <div style={{ width: "500px", border: "2px solid black", backgroundColor: "white" }}>
                <span><b>{props.movie.name} ,{props.movie.premiered.slice(0, 4)}</b></span><br />
                genres:{genresToRender}<br /><br />
                <Grid container spacing={3}>
                    <Grid item>{imageToRender}</Grid>
                    <Grid item><SubsWatchedComp movie={props.movie} /><br /></Grid>
                </Grid>
                {editBtnToRender}{deleteBtnToRender}

            </div> */}
        </Container>

    )
}
export default MovieComp