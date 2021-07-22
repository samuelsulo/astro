import React, {useState, useEffect} from 'react';
import { useHistory, Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validator from 'validator'

import { Container, Typography, TextField, CssBaseline, Avatar, Grid, InputAdornment, IconButton, FormControlLabel, Checkbox, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { auth } from '../../store/actions/auth';
import { useStyles } from './styles';

const initialState = { username: '', email: '', password: '' };
const initialFormErrorsState = {
    username: {label: 'Username', error: false }, 
    email: {label: 'Email adress', error: false }, 
    password: {label: 'Password', error: false },
    error: '',
};

function Auth() {
    document.title = "Astro | Auth";
    const history = useHistory();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const [user, setUser] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialFormErrorsState);
    const [checkbox, setCheckbox] = useState(false);
    
    useEffect(() => {
        if (history.location.pathname === '/account/signup')
            setIsSignup(true);
        else
            setIsSignup(false);
    }, [history.location.pathname]);
    
    // hide show password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    // switch mode
    const switchMode = () => {
        setFormErrors(initialFormErrorsState);
        history.push(isSignup ? '/account/signin' : '/account/signup');
    }

    // handle form data
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        if (isSignup)
            handleErrors(e);
    };
    
    // handle signup errors
    const handleErrors = (e) => {
        if (e.target.name === "username")
            if ((e.target.value).includes(' '))
                setFormErrors({...formErrors, username: { label: 'No spaces please', error: true } });
            else setFormErrors({...formErrors, username: { label: 'Username', error: false } });
        else if (e.target.name === "email") {
            if (!validator.isEmail(e.target.value))
                setFormErrors({...formErrors, email: { label: 'Invalid email', error: true } });
            else setFormErrors({...formErrors, email: { label: 'Email adress', error: false } });
        }
        else if (e.target.name === "password") {
            if ((e.target.value).length < 8)
                setFormErrors({...formErrors, password: { label: 'Password must be atleast 8 characters long', error: true } });
            else setFormErrors({...formErrors, password: { label: 'Password', error: false } });
        }
    }    

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formErrors.username.error && !formErrors.email.error && !formErrors.password.error)
            dispatch(auth(user, checkbox, history, isSignup, formErrors, setFormErrors));
    }

    const classes = useStyles();
    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isSignup ? "Sign up" : "Sign in"}
                    </Typography>
                    <Typography variant="body1" style={{color: 'red'}}>{formErrors.error}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignup && (
                            <Grid item xs={12}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label={formErrors.username.label}
                                    name="username"
                                    autoComplete="username"
                                    autoFocus 
                                    value={user.firstName}
                                    onChange={handleChange}
                                    error={formErrors.username.error}
                                />
                            </Grid>)}
                            <Grid item xs={12}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label={formErrors.email.label}
                                    name="email"
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    error={formErrors.email.error}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    label={formErrors.password.label}
                                    name="password"
                                    autoComplete="current-password"
                                    value={user.password}
                                    onChange={handleChange}
                                    error={formErrors.password.error}
                                    InputProps= {{
                                        endAdornment:
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                          >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                          </IconButton>
                                        </InputAdornment>} }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel 
                                    control={<Checkbox value={user.checkbox} onChange={() => setCheckbox(!checkbox)} color="primary"/>}
                                    label={isSignup ? "Allow us to send emails including the latest updates." : "Remember me."}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            {isSignup ? "Sign up" : "Sign in"}
                        </Button>
                        <Grid container justifyContent="space-evenly">
                        {!isSignup && <Grid item>
                                <Link to="/account/password/forgot" className={classes.link} variant="body2">
                                    Forgot your password?
                                </Link>
                            </Grid>}
                            <Grid item>
                                <span className={classes.link} onClick={switchMode} variant="body2">
                                    {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                                </span>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default Auth;