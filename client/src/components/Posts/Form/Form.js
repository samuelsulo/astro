import React from 'react';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';

import Post from '../Post/Post';
import { createPost, updatePost } from '../../../store/actions/posts';
import { useStyles } from './styles';

const initialState = { title: '', image: '', description: '', tags: ''}

function Form() {
    const history = useHistory();
    const dispatch = useDispatch();
    const update = history.location.state;
    let post = update !== undefined ? update : initialState;
    const [formData, setFormData] = React.useState(post);
    const [error, setError] = React.useState('');
    const { user } = useSelector(state => state.authReducer);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    React.useEffect(() => {
        if (post.tags !== '') {
            let tags = '';
            for (let i = 0; i < (post.tags).length; i++) {
                tags += (post.tags)[i];
            }
            setFormData({ ...formData, tags: tags });
        }
    }, [post.tags]);

    const handleTags = (e) => {
        let tag = e.target.value;
        if (tag.length === 1 && tag !== '#')
            tag = '#' + tag;
        else if (tag.charAt(tag.length - 1) === ' ') {
            tag = tag.substring(0, tag.length - 1) + '#';
        }
        setFormData({ ...formData, [e.target.name]: tag });
    }

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (formData.image === '') {setError('Select an image'); return;}
        setError('');
        dispatch(createPost(formData, history)); 
        setFormData(initialState);
    }

    const handleUpdatePost = (e) => {
        e.preventDefault();
        dispatch(updatePost(post._id, formData, history));
        setFormData(initialState);
    }
    
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.main}>
            <Grid item lg={4} md={5} sm={7} xs={12}>
                <form onSubmit={update !== undefined ? handleUpdatePost : handleCreatePost} className={classes.form}>
                    <Typography variant="h4" className={classes.title}>{update !== undefined ? "Update" : "Create"} your Post</Typography>
                    <Typography variant="body1" className={classes.error}>{error}</Typography>
                    <Grid container spacing={2} className={classes.container}>
                        <Grid item  xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField 
                                variant="outlined"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                multiline={true}
                                value={formData.description}
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item  xs={12}>
                            <TextField 
                                variant="outlined"
                                fullWidth
                                id="tags"
                                label="Tags (space to separate tags)"
                                name="tags"
                                multiline={true} 
                                value={formData.tags}
                                onChange={handleTags}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, image: base64 })} />
                        </Grid>
                    </Grid>
                    <div>
                        <Button className={classes.updateButton} type="submit">{update !== undefined ? "UPDATE" : "POST"}</Button>
                        <Button className={classes.cancelButton} onClick={() => history.goBack()}>CANCEL</Button>
                    </div>
                </form>
            </Grid>
            <Grid item lg={3} md={3} sm={5} xs={10}>
                <Typography variant="h4">Preview</Typography>
                <Post post={formData} createPost={true} avatar={user}/>
            </Grid>
        </Grid>
    )
}

export default Form
