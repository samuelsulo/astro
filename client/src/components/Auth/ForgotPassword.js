import React from 'react';
import validator from 'validator'

import { Container, Typography, TextField, CssBaseline, Avatar, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { forgotPassword } from '../../store/api';
import { useStyles } from './styles';

const initialState = {
    label: 'Email adress',
    value: '',
    error: false,
    requestRes: '',
}

function ForgotPassword () {
    document.title = "Astro | Forgot Password";
    const [email, setEmail] = React.useState(initialState);
    const [sent, setSent] = React.useState(false);

    const handleChange = (e) => {
        if (!validator.isEmail(e.target.value))
            setEmail({...email, value: e.target.value, error: true, label: "Invalid email" });
        else setEmail({...email, value: e.target.value, error: false, label: "Email adress" });
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.error) return;
        async function sendRequest () {
            try {
                await forgotPassword(email.value);

                setSent(true);

            } catch (error) {
                setEmail({...email, requestRes: "Something went wrong" });
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
                        Reset your password
                    </Typography>
                    <Typography variant="body1" style={{color: 'red'}}>{email.requestRes}</Typography>
                    { !sent ? 
                    <>
                        <Typography variant="body1" align="center">To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</Typography>

                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField 
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label={email.label}
                                        name="email"
                                        autoComplete="email"
                                        value={email.value}
                                        onChange={handleChange}
                                        error={email.error}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                SEND EMAIL
                            </Button>
                        </form> 
                    </>
                        :
                        <Grid container justifyContent="center">
                            <Grid item sm={8} xs={10} align="center" className={classes.sentEmail}>
                                <CheckCircleIcon align="center"/>
                                <Typography align="left" variant="body1">Please check your email inbox for a link to complete the reset.</Typography>
                            </Grid>    
                        </Grid>}
                </div>
            </Container>
        </>
    )
}

export default ForgotPassword;
