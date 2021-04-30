import React, {useState, useEffect} from 'react';

export const useStravaLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    console.log("logging in to Strava")

    useEffect(() => {
        const logIn = () => {
            isLoggedIn ? console.log("Logged in") : () => {setIsLoggedIn(true); console.log("Switched to logged in") }
        }

        logIn();
    })


    return isLoggedIn ? 'Logged in' : 'Not logged in';

}