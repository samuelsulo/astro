import { Typography } from "@material-ui/core";

export function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <span>Samuel Sulo </span>
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }