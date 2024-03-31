import axios from "axios";
import { createContext,useEffect,useState } from "react";

export let  UserContext = createContext();

export default function UserContextProvider ({children}){
    const [user, setUser] = useState(null);
    const [userData,setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)


    const getUserContext = async ()=>{
        if(user){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
                headers: {
                  Authorization: `Aman__${user}`
                }
              });
              console.log(data)
               setUserData(data.user);
               setIsLoading(false);
        } 
    }

    useEffect(()=>{
        getUserContext();
    },[user])

    return <UserContext.Provider value={{user,setUser,userData,setUserData,isLoading}}>
        {children}
    </UserContext.Provider>
}