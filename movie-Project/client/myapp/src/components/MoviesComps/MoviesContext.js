import { createContext, useState } from "react";
export const Context = createContext()
export const ContextProvider = (props) => {
    const [movies, setMovies] = useState([])
    return (
        <Context.Provider value={[movies, setMovies]}>
            {props.children}
        </Context.Provider>
    )
}
