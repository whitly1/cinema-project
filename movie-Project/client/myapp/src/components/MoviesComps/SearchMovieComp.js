import React from 'react'
import { Toolbar, CssBaseline, IconButton, TextField } from '@material-ui/core'
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
const SearchMovieComp = (props) => {
    return (
        <div style={{ display: "inline" }}>
            <CssBaseline />
            <Toolbar >
                <IconButton>
                    <MovieCreationIcon />
                </IconButton>
                <TextField
                    variant="outlined"
                    label="search movie"
                    name="search movie"
                    autoComplete="search movie"
                    onChange={(e) => { props.getSearchData(e.target.value) }} />
            </Toolbar>

            {/* Find:<input type="text" onChange={(e) => { props.getSearchData(e.target.value) }} /> */}
        </div>


    )
}
export default SearchMovieComp