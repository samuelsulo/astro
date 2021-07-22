import React from 'react';
import { IconButton, makeStyles} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { pink } from '@material-ui/core/colors';

function NavbarLink() {
    const useStyles = makeStyles(theme => ({
        navbarlink : {
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            backgroundColor: pink[400],
            borderRadius: '50%',
            [theme.breakpoints.down('xs')]: {
                bottom: '40px',
            }
        },
        icon: {
            [theme.breakpoints.down('xs')]: {
                width: '30px',
                height: '30px',
            }
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <a className={classes.navbarlink} href="#navbar">
                <IconButton className={classes.icon}>
                    <KeyboardArrowUpIcon />
                </IconButton>
            </a>
        </div>
    )
}

export default NavbarLink;
