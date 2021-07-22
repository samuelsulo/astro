import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IconButton, Menu, MenuItem, Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { deletePost, reportPost } from '../../../store/actions/posts';
import { useStyles } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PostActions({ post, home, createPost }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [reportDescription, setReportDescription] = React.useState('');

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setReportDescription('');
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const deleteThisPost = () => {
        dispatch(deletePost(post._id));
    }

    const reportThisPost = () => {
        reportPost(reportDescription, post._id);
    }

    const handleSubmit = () => {
        if (home && reportDescription !== '') {
            handleDialogClose();
            reportThisPost(); 
        }
        else if (!home) {
            handleDialogClose();
            deleteThisPost();
        }
    }

    const classes = useStyles();
    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                disabled={createPost ? true : false}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
            >
                {!home && 
                    <Link className={classes.link} to={{pathname: "/user/profile", search: "?addPost", state: post}}>
                        <MenuItem onClick={handleClose} className={classes.menuItem}>Update</MenuItem>
                    </Link> 
                }
                <MenuItem onClick={() => {handleClose(); handleDialogOpen() }} className={classes.menuItem + ' ' + classes.deleteButton}>
                    {!home ? "Delete" : "Report"}
                </MenuItem>
            </Menu>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" className={classes.dialogTitle}>{!home ? "Delete Post?" : "Why are you reporting this post?"}</DialogTitle>
                <DialogContent>
                   {!home ? 
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this post?
                        </DialogContentText> 
                    :
                        <TextField 
                            autoFocus 
                            multiline 
                            margin="dense" 
                            id="report" 
                            label="Description" 
                            type="text" 
                            fullWidth 
                            value={reportDescription}
                            onChange={(e) =>  setReportDescription(e.target.value)}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} className={classes.dialogButtonNo}>
                        {!home ? "No" : "Cancel"}
                    </Button>
                    <Button onClick={handleSubmit} className={classes.dialogButtonYes}>
                        {!home ? "Yes" : "Report"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PostActions;
