import { createContext, useState } from "react";
export const subscriptionsContext = createContext()
export const SubsContextProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])
    return (
        <subscriptionsContext.Provider value={[subscriptions, setSubscriptions]}>
            {props.children}
        </subscriptionsContext.Provider>
    )
}