<<<<<<< HEAD
import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {auth, signInWithEmailAndPassword, signInWithGoogle} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "./Login.css";
import { flexbox } from "@mui/system";
=======
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useHistory, Redirect, Route, Switch } from "react-router-dom";
import { auth, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
<<<<<<< HEAD
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) history.replace("/app/order");
    }, [user, loading]);
    return (
        <div className="login" style={{position:"absolute",top:-70,left :20}}>
=======
    const [member, setMember] = useState();
    const [user, error] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const signInWithEmailAndPassword = async (email, password) => {
        try {
            setLoading(true);
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            setLoading(false);
            console.error(err);
            alert(err.message);
        }
    };
    if (loading) {
        return (
            <center>
                <CircularProgress />

            </center>
        )
    }
    return (
        <div className="login" style={{ position: "absolute", top: -70, left: 20 }}>
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
<<<<<<< HEAD
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
=======
                    onClick={() => {
                        signInWithEmailAndPassword(email, password)
                    }}
                >
                    Login
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
>>>>>>> 25579f4869cacacfc834ccd265af547bd7ce0dde
            </div>
        </div>
    );
}

export default Login;
