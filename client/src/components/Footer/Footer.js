import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

import { Copyright } from '../Copyright/Copyright';
import { useStyles } from './styles';


export default function StickyFooter() {
  
  const classes = useStyles();
  return (
      <footer className={classes.footer}>
          <div className={classes.footerBottom}>
            <div className={classes.footerSocialLinks}>
              <a href="https://www.linkedin.com/in/samuel-sulo-669298209/" className={classes.link}><LinkedInIcon /></a>
              <a href="https://www.instagram.com/samuelsulo/" className={classes.link}><InstagramIcon /></a>
              <a href="https://github.com/Samuel-Sulo/astro" className={classes.link}><GitHubIcon /></a>
            </div>
            <div className={classes.footerCopyright}>
              <Copyright />
            </div>
          </div>
      </footer>
  );
}
