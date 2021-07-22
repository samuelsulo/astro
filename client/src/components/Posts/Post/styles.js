import { makeStyles, colors } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
    borderTop: `1px solid ${colors.grey[100]}`,
    borderBottom: `1px solid ${colors.grey[100]}`,
    position: 'relative',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cardHeaderTitle: {
    fontWeight: 500,
    fontSize: '16px',
  },
  itemLeft: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black',
  },
  itemLeft1: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
  },
  itemLeft2: {
    width: '70%',
  },
  itemRight: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderLink: {
    textDecoration: 'none',
    color: 'black',
    width: '100%',

  },
  cardContent: {
    paddingBottom: 0,
    paddingTop: 0,

  },
  cardContentTitle: {
    fontWeight: 500,
  },
  description: {
    height: 60,
  },
  actions: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  dialogTitle: {
    color: colors.pink[500],
  },
  dialogButtonNo: {
    backgroundColor: colors.lightBlue[500],
    color: colors.grey[50],
    '&:hover': {
      backgroundColor: colors.lightBlue[700],
    }
  },
  dialogButtonYes: {
    backgroundColor: colors.pink[500],
    color: colors.grey[50],
    '&:hover': {
      backgroundColor: colors.pink[700],
    }
  },
  link: {
    textDecoration: 'none',
    color: colors.lightBlue[500],
  },
  deleteButton: {
    color: colors.pink[500],
  },
  likesLink: {
    cursor: 'pointer',
    fontWeight: 500,
  }

}));