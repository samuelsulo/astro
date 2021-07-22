import React from 'react';
import { Container, Grid, Typography, Avatar, Button, Divider } from '@material-ui/core';

import NavbarLink from '../../NavbarLink/NavbarLink';
import { headers, details } from './data';
import { useStyles } from './styles';

function Work() {
    document.title = "Astro | Work";
    let sectionRef = ["frontend", "backend", "database"];

    const classes = useStyles();
    return (
    <>  
        <NavbarLink />
        <Container className={classes.header} component="header" maxWidth={false}>
           <Grid className={classes.headerImage}>
               <Typography variant="h5" className={classes.welcome}>MERN-STACK</Typography>
           </Grid>
           <Grid container className={classes.headerContent} justifyContent="center">
               {headers.map((header, index) => (
                    <Grid key={index} item md={3} sm={7} xs={12} className={classes.headers} align="center">
                        <Avatar src={header.avatar} className={classes.avatar}></Avatar>
                        <Typography variant="h5">{header.title}</Typography>
                        <Typography>{header.text}</Typography>
                        <Button className={classes.btn}><a className={classes.link} href={'#' + sectionRef[index]}>View details</a></Button>
                    </Grid>
               ))}
           </Grid>
        </Container>
        <Container className={classes.main} component="main" maxWidth="lg">
            {details.map((detail, index) => (
            <React.Fragment key={index}>
                <Divider id={sectionRef[index]} className={classes.divider}/>
                <Grid container className={classes.mainContent}  justifyContent="space-around">
                    <Grid item sm={7}  xs={12} className={classes.contentData + ` ${index % 2 === 1 ? classes.contentData2 : ''}`}>
                        <Typography variant="h3" className={classes.title}>{detail.title}</Typography>
                        <Typography variant="h4" className={classes.subtitle}>{detail.subtitle}</Typography>
                        <Typography variant="body1" className={classes.text}>{detail.text}</Typography>
                    </Grid>
                    <Grid item sm={4} className={index % 2 === 1 ? classes.contentImage2 : ''} >
                        <Grid container spacing={2} justifyContent="center">
                        {(detail.img).map((img, i) => (
                            <Grid item key={i} md={index !== 2 ? 6 : 12} sm={12} xs={index !== 2 ? 6 : 12} className={classes.contentImage} style={{backgroundImage: `url(${img})`}}/>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
            ))}
        </Container>
    </>
    )
}

export default Work;
