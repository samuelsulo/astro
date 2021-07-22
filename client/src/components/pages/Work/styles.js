import { makeStyles } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";


export const useStyles = makeStyles((theme) => ({
    header: {
        padding: 0,
        margin: 0,
    },
    headerImage: {
        backgroundColor: colors.pink[500],
        backgroundImage: `url(${"/img/mern_stack.jpg"})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: "48px",
        color: colors.grey[50],
        [theme.breakpoints.down('sm')]: {
            fontSize: '42px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '26px',
        },
    },
    headerContent: {
        padding: theme.spacing(2, 10),
    },
    headers: {
        margin: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginBottom: theme.spacing(1),
        border: `1px solid ${colors.grey[300]}`,
    },
    btn: {
        backgroundColor: colors.lightBlue[600],
        color: colors.grey[50],
        marginTop: theme.spacing(2),
        textTransform: 'none',
        '&:hover': {
            backgroundColor: colors.pink[600],
        }
    },
    main: {
        padding: theme.spacing(2, 10),
    },
    mainContent: {
        margin: theme.spacing(10, 0),
    },
    contentData: {
        marginBottom: theme.spacing(4),
    },
    contentImage: {
        minWidth: '100px',
        minHeight: '100px',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.down('xs')]: {
            minWidth: '0',
            minHeight: '0',
            width: '100px',
            height: '100px',
            
        }
        
    },
    contentData2: {
        paddingLeft: theme.spacing(4),
        order: 2,
        [theme.breakpoints.down('xs')]: {
            order: 1,
            paddingLeft: theme.spacing(0),
          },
    },
    contentImage2: {
        order: 1,
        [theme.breakpoints.down('xs')]: {
            order: 2,
          },
    },
    title: {
        color: colors.lightBlue[500],
        [theme.breakpoints.down('sm')]: {
            fontSize: '28px',
            fontWeight: '500',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize: '22px',
            fontWeight: '500',
          },
    },
    subtitle: {
        color: colors.pink[500],
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
            fontWeight: '500',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
            fontWeight: '500',
          },
    },
    text: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px',
            fontWeight: '400',
          },
    },
    divider: {
        backgroundImage: `linear-gradient(to right, ${colors.lightBlue[500]}, ${colors.pink[500]})`,
        height: '4px',
        borderRadius: '20px',
    },
    link: {
        textDecoration: 'none',
        color: colors.grey[50],
    }
    
}));