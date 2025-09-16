import { createContext, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

        const [user, loading, error] = useAuthState(auth);
        const [showlogin , setshowlogin] = useState (false);

        const value = {

            user, loading, error,
            showlogin , setshowlogin

        }


        return (
            <AppContext.Provider value={value}>

                {props.children}
            </AppContext.Provider>
        )
}

export default AppContextProvider;