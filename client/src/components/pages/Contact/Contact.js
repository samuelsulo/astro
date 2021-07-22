import React from 'react';
import { Container, Grid, TextField, Button, Typography } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import validator from 'validator';

import { contactUs } from '../../../store/api/index';
import { useStyles } from './styles';

const initialState = { name: '', email: '', message: ''};

function Contact() {
    const [formData, setFormData] = React.useState(initialState);
    const [invalidEmail, setInvalidEmail] = React.useState(false);
    const [response, setResponse] = React.useState({ message: '', color: '' });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
        if (e.target.name === "email")
            if (!validator.isEmail(e.target.value))
                setInvalidEmail(true);
            else setInvalidEmail(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.error) {
            send();
            setFormData(initialState);
            setInvalidEmail(false);
        }
    }

    const send = () => {
        try {
            contactUs(formData);
            
            setResponse({...response, message: "Email sent succesfully", color: "green"});
            
        } catch (error) {
            setResponse({...response, message: "Something went wrong", color: "red"});
        }
    }

    const classes = useStyles();
    return (
        <Container className={classes.root} component="div" maxWidth={false}>
            <Grid container className={classes.main}>
                <Grid item sm={6} xs={12} className={classes.formContainer}>
                    <Typography variant="h4">Contact us</Typography>
                    <Typography variant="subtitle1" style={{color: response.color}}>{response.message}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item md={8} xs={12}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Enter your name"
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter a valid email adress"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={invalidEmail}
                                />
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="message"
                                    label="Enter your message"
                                    name="message"
                                    autoComplete="message"
                                    multiline={true}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" className={classes.formButton}>Send</Button>
                    </form>
                </Grid>
                <Grid item sm={6} xs={12} className={classes.data}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} align="center">
                            <PhoneIphoneIcon />
                            <a className={classes.link} href="tel:345-955-1342">
                                <Typography variant="body1">345 955 1342</Typography>
                            </a>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <EmailIcon />
                            <a className={classes.link} href="mailto: astro6268@gmail.com">
                                <Typography variant="body1">astro6268@gmail.com</Typography>
                            </a>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <InstagramIcon />
                            <a className={classes.link} href="https://www.instagram.com/">
                                <Typography variant="body1">Astro</Typography>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Contact
