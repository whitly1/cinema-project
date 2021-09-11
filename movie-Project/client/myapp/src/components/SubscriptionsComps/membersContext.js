import { createContext, useState } from "react";
export const membersContext = createContext()
export const MembersContextProvider = (props) => {
    const [members, setMembers] = useState([])
    return (
        <membersContext.Provider value={[members, setMembers]}>
            {props.children}
        </membersContext.Provider>
    )
}