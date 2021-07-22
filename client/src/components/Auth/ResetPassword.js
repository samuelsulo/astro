import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, TextField, CssBaseline, Avatar, Grid, Button, InputAdornment, IconButton } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { resetPassword } from '../../store/api';
import { useStyles } from './styles';

const initialState = {
    label: 'Password',
    value: '',
    error: false,
    requestRes: '',
    color: '',
}

function ResetPassword() {
    document.title = "Astro | Reset Password";
    const history = useHistory();
    const token = (history.location.search).substring(1, (history.location.search).length);
    const [password, setPassword] = React.useState(initialState);
    const [showPassword, setShowPassword] = React.useState(false);
    
    if (!token) history.goBack();
    
    // hide show password
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        if ((e.target.value).length < 8)
            setPassword({...password, value: e.target.value, error: true, label: "Password must be atleast 8 characters long" });
        else setPassword({...password, value: e.target.value, error: false, label: "Password" });
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.error) return;
        async function sendRequest() {
            try {
            const {data} = await resetPassword(password.value, token);

            setPassword({...password, requestRes: data, color: 'green' });

            setTimeout(() => history.replace("/account/signin"), 1500);
                
            } catch (error) {
                setPassword({...password, requestRes: "Something went wrong", color: 'red' });
            }
        } sendRequest();
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
                        Create a new password
                    </Typography>
                    <Typography variant="body1" style={{color: password.color }}>{password.requestRes}</Typography>
                    
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    label={password.label}
                                    name="password"
                                    autoComplete="current-password"
                                    value={password.value}
                                    onChange={handleChange}
                                    error={password.error}
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                           RESET PASSWORD
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default ResetPassword
