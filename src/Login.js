import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {auth, signInWithEmailAndPassword, signInWithGoogle} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        <div className="login">
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
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
