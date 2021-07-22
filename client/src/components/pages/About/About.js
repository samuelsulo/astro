import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Grid, Typography, Divider, Button } from '@material-ui/core';

import Contact from '../Contact/Contact';
import NavbarLink from '../../NavbarLink/NavbarLink';
import {useStyles }from './styles';

function About() {
    document.title = "Astro | About";
    const contact = React.useRef();
    const location = useLocation();
    
    React.useEffect(() => {
        if (location.hash === "#contact")
            contact.current.scrollIntoView();
    },)

    const classes = useStyles();
    return (
        <Container component="div" className={classes.container} maxWidth={false}>
            <NavbarLink />
            <Grid container className={classes.header} justifyContent="center">
                <Grid item md={4} sm={5} xs={12} className={classes.headerDescription} >
                    <Typography variant="h3">Hi! We're Astro</Typography>
                    <Divider className={classes.divider}/>
                    <Typography variat="body1">We allow you to share your posts with everybody. Sign up to create your own profile and start posting now.</Typography>
                    <Link to="/account/signup" className={classes.link}><Button size="large" className={classes.button}>Sign Up</Button></Link>
                </Grid>
                <Grid item md={4} sm={5} xs={12} className={classes.headerImage} />
            </Grid>
            <Grid container className={classes.main}>
                <Typography variant="h4" className={classes.mainTitle}>Share the best memories of your life</Typography>
                <Typography variant="h6" className={classes.mainSubtitle}>All memories have value</Typography>
                <Typography variant="body1" className={classes.mainText}>1) Pick your favorite picture.</Typography>
                <Typography variant="body1" className={classes.mainText}>2) Give it a proper description.</Typography>
                <Typography variant="body1" className={classes.mainText}>3) Share it with everyone.</Typography>
            </Grid>
            <Grid container className={classes.bottom}>
                <Grid item className={classes.bottomImages} sm={4} xs={12} style={{backgroundImage: `url(${"/img/library.jpg"})`}} />
                <Grid item className={classes.bottomImages} sm={4} xs={12} style={{backgroundImage: `url(${"/img/skull_island.jpg"})`}} />
                <Grid item className={classes.bottomImages} sm={4} xs={12} style={{backgroundImage: `url(${"/img/mushroom_woods.jpg"})`}} />
            </Grid>
            <div ref={contact}><Contact/></div>
        </Container>
    )
}

export default About
