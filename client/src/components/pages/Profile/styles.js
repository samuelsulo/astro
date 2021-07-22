import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(4, 0),
        backgroundImage: `linear-gradient(to right, ${colors.pink[500]} , ${colors.lightBlue[500]} )`,
        color: colors.grey[50],
    },
    avatar: {
        marginBottom: theme.spacing(1),
    },
    name: {
        marginBottom: theme.spacing(2),
    },
    settingsContainer: {
        padding: theme.spacing(4, 2),
    },
    form: {
        marginTop: theme.spacing(4),
    },
    updateButton: {
        backgroundColor: colors.lightBlue[500],
        color: colors.grey[50],
        '&:hover': {
            backgroundColor: colors.pink[500],
            [theme.breakpoints.down('xs')]: {
                backgroundColor: colors.lightBlue[500],
            },
        },
    },
    cancelButton: {
        marginLeft: theme.spacing(2),
        backgroundColor: colors.grey[300],
        '&:hover': {
            backgroundColor: colors.grey[400],
        },
    },
    settingsTitle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '24px',
        }
    },
    bio: {
        paddingTop: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: colors.grey[50],
        cursor: "pointer",
    },
    colorPicker: {
        marginTop: theme.spacing(2),
    },
    followButton: {
        marginTop: theme.spacing(2),
        backgroundColor: colors.lightBlue[500],
        color: colors.grey[50],
        '&:hover': {
            backgroundColor: colors.lightBlue[500],
        }
    },
    unFollowButton: {
        marginTop: theme.spacing(2),
        backgroundColor: colors.pink[500],
        color: colors.grey[50],
        '&:hover': {
            backgroundColor: colors.pink[500],
        },  
    },
    searchList: {
        width: '250px',
        maxHeight: '400px',
    },
    searchListItem: {
        color: colors.grey[900],
        width: '100%',
    },
    dialogAvatar: {
        width: '30px',
        height: '30px',
        fontSize: '14px',
        marginRight: '20px',
        border: `1px solid ${colors.grey[200]}`,
    },
    closeDialog: {
        width: '30px',
        height: '30px',
        color: colors.pink[500],
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    }

}));