import { colors, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {

    },
    main: {

    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        
        padding: theme.spacing(3),
    },
    form: {
        padding: theme.spacing(2, 0),
    },
    formButton: {
        marginTop: theme.spacing(2),
        backgroundColor: colors.lightBlue[500],
        '&:hover': {
            backgroundColor: colors.pink[500],
        },
        [theme.breakpoints.down('xs')]: {
            backgroundColor: colors.pink[500],
        }
    },
    data: {
        padding: theme.spacing(6, 0),
        backgroundColor: colors.pink[500],
        color: 'white',
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2),
        }
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    }
}))