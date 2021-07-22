import { colors, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
    },
    link: {
        marginTop: theme.spacing(2),
        textDecoration: 'none',
    },
    button: {
        backgroundColor: colors.lightBlue[500],
        color: colors.grey[50],
        '&:hover': {
            backgroundColor: colors.pink[500],
        }
    }
}))