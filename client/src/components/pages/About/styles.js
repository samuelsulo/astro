import { makeStyles } from "@material-ui/core";
import * as colors from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: 0,
    },
    header: {
        backgroundColor: colors.pink[500],
        padding: theme.spacing(5, 0),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(8),
        }
    },
    headerDescription: {
        color: colors.grey[50],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            marginBottom: theme.spacing(2),
        },
    },
    headerImage: {
        backgroundImage: `url(${"/img/library.jpg"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '300px',
    },
    divider: {
        backgroundImage: `linear-gradient(to right, ${colors.lightBlue[500]}, ${colors.blue[700]})`,
        height: '4px',
        borderRadius: '20px',
        margin: theme.spacing(2, 0),
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4, 0),
    },
    mainTitle: {
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
            fontWeight: '600',
        }
    },
    mainSubtitle: {
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
            fontWeight: '500',
        }
    },
    mainText: {
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px',
        }
    },
    bottom: {
        backgroundColor: colors.lightBlue[500],
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(6, 6),
        },
    },
    bottomImages: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '200px',
    },
    link: {
        textDecoration: 'none',
    },
    button: {
        marginTop: theme.spacing(2),
        color: colors.grey[50],
        backgroundColor: colors.lightBlue[500],
        '&:hover': {
            backgroundColor: colors.lightBlue[600],
        }
    }
}));