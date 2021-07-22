import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import Twitter from 'react-color/es/Twitter';

import { Container, Grid, TextField, Typography, Button} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useStyles } from './styles';
import { updateProfile } from '../../../store/actions/auth';

const initialFormErrorsState = {
    username: {label: 'Username', error: false }, 
    email: {label: 'Email adress', error: false }, 
    phoneNumber: { label: 'Phone Number', error: false },
    error: '',
};

function Settings( {user} ) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState(user);
    const [formErrors, setFormErrors] = React.useState(initialFormErrorsState);
    const [fileKey, setFileKey] = React.useState('new');
    const [colorPicker, setColorPicker] = React.useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        handleErrors(e);
    }

    const clear = () => {
        setFormData(user);
        setFileKey('cancel');
        setFormErrors(initialFormErrorsState);
    }

    const handleErrors = (e) => {
        if (e.target.name === "username")
            if ((e.target.value).includes(' '))
                setFormErrors({...formErrors, username: { label: 'No spaces please', error: true } });
            else setFormErrors({...formErrors, username: { label: 'Username', error: false } });
        else if (e.target.name === "phoneNumber")
            if(!validator.isMobilePhone(e.target.value))
                setFormErrors({...formErrors, phoneNumber: { label: 'Invalid phone number', error: true } });
            else setFormErrors({...formErrors, phoneNumber: { label: 'Phone Number', error: false } });
        else if (e.target.name === "email") {
            if (!validator.isEmail(e.target.value))
                setFormErrors({...formErrors, email: { label: 'Invalid email', error: true } });
            else setFormErrors({...formErrors, email: { label: 'Email adress', error: false } });
        }
        else if (e.target.name === "password") {
            if ((e.target.value).length < 8)
                setFormErrors({...formErrors, password: { label: 'Password must be atleast 8 characters long', error: true } });
            else setFormErrors({...formErrors, password: { label: 'Password', error: false } });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formErrors.phoneNumber.error && !formErrors.username.error && !formErrors.email.error)
            dispatch(updateProfile(formData, history, formErrors, setFormErrors));
    }

    const classes = useStyles();
    return (
        <Container component="div" maxWidth={false} className={classes.settingsContainer}>
            <Grid container justifyContent="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" className={classes.settingsTitle}>Account Settings</Typography>
                </Grid>
                <Grid item lg={6} md={8} sm={10} xs={12}>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item sm={4} xs={12}>
                                <TextField 
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="fName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <TextField 
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label={formErrors.username.label}
                                    name="username"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={formErrors.username.error}
                                />
                            </Grid>
                            <Grid item sm={7} xs={12}>
                            <TextField 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label={formErrors.email.label}
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={formErrors.email.error}
                                />
                            </Grid>
                            <Grid item sm={5} xs={12}>
                                <TextField 
                                    variant="outlined"
                                    fullWidth
                                    id="phoneNumber"
                                    label={formErrors.phoneNumber.label}
                                    name="phoneNumber"
                                    autoComplete="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    error={formErrors.phoneNumber.error}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    variant="outlined"
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="description"
                                    multiline={true}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item md={4} xs={12}>
                                        <FileBase key={fileKey} type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, image: base64 })} />
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <Button size="small" onClick={() => setFormData({...formData, image: ''} )} className={classes.updateButton}>
                                            Remove image
                                        </Button>
                                    </Grid>
                                    <Grid item md={4} sm={8} xs={12}>
                                        <Button size="small" onClick={() => setColorPicker(!colorPicker)} className={classes.updateButton}>
                                            Avatar Color
                                        </Button>
                                        {colorPicker && <Twitter className={classes.colorPicker} color={formData.avatarColor} onChange={(color) => setFormData({...formData, avatarColor: color.hex})}/>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <Button type="submit" className={classes.updateButton}>Update</Button>
                                <Button onClick={clear} className={classes.cancelButton}>Cancel</Button>
                            </Grid>
                        </Grid> 
                    </form>
                </Grid>
            </Grid>    
        </Container>
    )
}

export default Settings;
