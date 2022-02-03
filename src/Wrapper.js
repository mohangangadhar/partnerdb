import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { auth } from "./firebase"
const Wrapper = () => {
    const [user, error] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        if (auth.user) {
            return;
        }
        else {
            history.push("/app/login");
        }
    })
    // console.log(window.location.href);
    return <div>
        Checking Authentication...
    </div>;
};

export default Wrapper;
