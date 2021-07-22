import { makeStyles } from "@material-ui/core";
import * as colors from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    width: '100%',
    backgroundColor: colors.lightBlue[500],
  },
  footerBottom: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'wrap',
  },
  footerSocialLinks: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
    color: colors.grey[50],
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  footerCopyright: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
    color: colors.grey[50],
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      justifyContent: 'center',
      paddingTop: theme.spacing(2),
    }
  },
  link: {
    textDecoration: 'none',
    color: colors.grey[50],
    width: '5%',
    textAlign: 'center',
    margin: theme.spacing(0, 2),
  },
}));