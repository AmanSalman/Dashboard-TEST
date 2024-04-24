// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export let UserContext = createContext();

// export default function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

    // const getUserContext = async () => {
    //     if (user) {
    //         try {
    //             const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
    //                 headers: {
    //                     Authorization: `Aman__${user}`,
    //                 }
    //             });
    //             if (data.message === "success") {
    //                 setUserData(data.user);
    //             }
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //             setIsLoading(false);
    //         }
    //     }
    // };

//     useEffect(() => {
//         getUserContext();
//     }, [user]);

//     useEffect(() => {
//         console.log(userData);
//     }, [userData]);

//     return (
//         <UserContext.Provider value={{ user, setUser, userData, setUserData, isLoading }}>
//             {children}
//         </UserContext.Provider>
//     );
// }
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('userToken') || null);
  const [userData, setUserData] = useState(localStorage.getItem('userData') || null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserContext = async () => {
    if (user) {
        try {
          // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
                headers: {
                    Authorization: `Aman__${user}`,
                }
            });
            if (data.message === "success") {
                setUserData(data.user);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoading(false);
        }
    }
};

  useEffect(() => {
    getUserContext();
  }, [user]);

  useEffect(() => {
    localStorage.setItem('userToken', user);
    localStorage.setItem('userData', userData);
  }, [user, userData]);

  // Log userData whenever it changes
  useEffect(() => {
    // console.log(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser, userData, setUserData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}