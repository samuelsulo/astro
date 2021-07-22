import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent,  DialogTitle, Slide, List, ListItem, Avatar, ListItemText, Divider, IconButton } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import { useStyles } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CostumDialog(props) {
    function compare(a, b) {
        if (a.username < b.username)
            return -1;
        else if (a.username > b.username)
            return 1;
        return 0;
    }

    const open = props.open;
    const setOpen = props.setOpen;
    const users = (props.users).sort(compare);
    const title = props.title;

    const handleDialogClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <Dialog
            scroll="paper"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >   
            <div className={classes.btnContainer}>
                <IconButton onClick={handleDialogClose} className={classes.closeDialog}>
                    <CancelIcon/>
                </IconButton>
            </div>
                
            <DialogTitle style={{padding: 0}} id="alert-dialog-slide-title" align="center">{title}</DialogTitle>
            <DialogContent>
            <List className={classes.searchList}>
                {users.map((x, index) => (
                    <Link to={{ 
                        pathname: `/profile`,
                        search: `${x.username}` 
                        }} key={index} className={classes.link}>
                        <ListItem onClick={handleDialogClose} className={classes.searchListItem}>
                            <Avatar className={classes.dialogAvatar} src={x.image} style={{backgroundColor: x.avatarColor}}>{(x.username).substring(0, 1).toUpperCase()}</Avatar>
                            <ListItemText primary={x.username} />
                        </ListItem>
                        <Divider />
                    </Link>
                    )
                )}
            </List>
            </DialogContent>
            <DialogActions>
               
            </DialogActions>
        </Dialog>
    )
}

export default CostumDialog;
