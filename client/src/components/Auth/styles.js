import { makeStyles } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: colors.lightBlue[500],
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: colors.lightBlue[500],
        color: colors.grey[50],
        '&:hover': {
            backgroundColor: colors.lightBlue[700],
        }
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'underline',
        color: colors.lightBlue[500],
        [theme.breakpoints.down('xs')]: {
            fontSize: '12px',
        }
    },
    sentEmail: {
        backgroundColor: colors.lightBlue[100],
        padding: theme.spacing(2),
        border: `1px solid ${colors.lightBlue[500]}`,
        color: colors.lightBlue[800],
        marginTop: theme.spacing(3),
    },
}));