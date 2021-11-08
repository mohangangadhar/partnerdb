import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase";
import "./Reset.css";
function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        if (user) history.replace("/dashboard");
    }, [user]);
    return (
        <div className="reset">
            <div className="reset__container">
                <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <button
                    className="reset__btn"
                    onClick={() => sendPasswordResetEmail(email)}
                >
                    Send password reset email
                </button>
                <div>
                    Remember Password?<Link to="/">Login</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Reset;