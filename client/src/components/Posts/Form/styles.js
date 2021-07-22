import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },
    form: {
        margin: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    error: {
        color: 'red',
        marginBottom: theme.spacing(2),
    },
    updateButton: {
        width: theme.spacing(10),
        marginTop: theme.spacing(2),
        backgroundColor: colors.lightBlue[500],
        color: colors.grey[50],
        '&:hover': {
            backgroundColor: colors.lightBlue[700],
        }
    },
    cancelButton: {
        width: theme.spacing(10),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        backgroundColor: colors.pink[500],
        color: colors.grey[50],
        '&:hover': {
            backgroundColor: colors.pink[700],
        },
    },
}));
