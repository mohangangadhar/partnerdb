import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import logo from "./assets/jeevamrut_logo.png";
import organicimg from "./assets/organic.jpg";
import CircularProgress from '@mui/material/CircularProgress';
import "./Login.css"

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.jeevamrut.in/">
                Jeevamrut
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Logo() {
    return <img src={logo} alt="Logo" className="cropped1" />;
}

const theme = createTheme();

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    useEffect(() => {

        if (user) {
            if (user.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2") {
                history.replace("/app/dashboard")
            }
            else {
                history.replace("/app/sellerdashboard");
            }
        }
    }, [user]);
    if (loading) {
        return (
            <center>
                <CircularProgress />
            </center>
        )
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: `url(${organicimg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Logo />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={() => {
                            signInWithEmailAndPassword(email, password)
                        }} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <div>
                                <Link to="/reset">Forgot Password</Link>
                            </div>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}