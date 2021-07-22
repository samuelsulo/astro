import { makeStyles } from '@material-ui/core'
import * as colors from '@material-ui/core/colors';

const drawerWidth = '240px';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(6),
    },
    appBar: {
        backgroundColor: colors.lightBlue[500],
        color: colors.grey[50],
        position: 'fixed',
        top: 0,
        left: 0,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
    },
    item1: {
        display: 'flex',
        alignItems: 'center',
        width: '30%',
    },
    item2: {
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        justifyContent: 'flex-end',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    list: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
    },
    drawerIcons: {
        color: colors.lightBlue[500],
    },
    link: {
        textDecoration: 'none',
        color: colors.grey[900],
    },
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between',
        color: colors.grey[900],
    },
    searchList: {
        position: 'absolute',
        width: '100%',
        borderRadius: '0 0 5px 5px',
        backgroundColor: colors.grey[200],
        zIndex: '500',
    },
    searchListItem: {
        color: colors.grey[900],
    },
    avatar: {
        width: '30px',
        height: '30px',
        fontSize: '13px',
        marginRight: '5px',
    },
    profileLink: {
        textDecoration: 'none',
        color: colors.grey[900],
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        justifyContent: 'flex-start',
    }, 
    logoLink: {
        textDecoration: 'none',
        color: 'white',
    }
}));