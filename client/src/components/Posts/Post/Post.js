import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PostActions from './PostActions';
import CostumDialog from '../../pages/Profile/CustomDialog';
import { likePost } from '../../../store/actions/posts';
import { useStyles } from './styles';
import Loading from '../../Loading/Loading';

function Post({ post, home, createPost, avatar }) {
  const classes = useStyles();
  const actualUserId = useSelector(state => state.authReducer.user._id);
  const { users } = useSelector(state => state.authReducer);
  const [expanded, setExpanded] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [liked, setLiked] = React.useState(!createPost && post.likes && (post.likes).includes(actualUserId) ? true : false);
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState();
  const [matchingUsers, setMatchingUsers] = React.useState([]);
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likeThisPost = () => {
    dispatch(likePost(post._id));
    setLiked(!liked);
  }

  const shareThisPost = () => {
    navigator.clipboard.writeText(`https://www.astroland.xyz/post?${post._id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  const openLikesDialog = (ids, title) => {
    let temp = []
    for (let i = 0; i < users.length; i++) {
      if (ids.includes(users[i]._id))
        temp.push(users[i]);
    }
    setMatchingUsers(temp);
    setOpen(true);
    setDialogTitle(title);
  }

  return (
    avatar ?
    <Card className={classes.root} key={post._id}>
      <div  className={classes.cardHeader}>
        <Link to={{pathname: "/profile", search: `${avatar.username}` }} className={classes.itemLeft}>
          <div className={classes.itemLeft1}>
            <Avatar aria-label="User" style={{backgroundColor: avatar.avatarColor}} src={avatar.image}>
              {(avatar.username).substring(0, 1).toUpperCase()}
            </Avatar>
          </div>
          <div className={classes.itemLeft2}>
            <Typography variant="body1" className={classes.cardHeaderTitle} >{avatar.username}</Typography>
          </div >
        </Link>
        <div className={classes.itemRight}>
          <PostActions post={post} home={home} createPost={createPost}/>
        </div >
      </div >
      <CardMedia
        className={classes.media}
        image={post.image ? post.image : "no image"}
      >{post.image ? '' : <Loading />}</CardMedia>
      <CardContent className={classes.cardContent}>
        {!createPost && 
          <Typography onClick={() => openLikesDialog(post.likes, "Likes")} className={classes.likesLink} variant="body2" component="p" align="right">
            {(post.likes).length === 1 ? `${(post.likes).length} like` : `${(post.likes).length} likes`} 
          </Typography>}
        <Typography variant="subtitle1" className={classes.cardContentTitle} component="p">
          {post.title}
        </Typography>
        <Typography variant="body2" component="p" className={classes.description}>
          {post.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">{post.tags}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <IconButton disabled={createPost} aria-label="add to favorites" onClick={likeThisPost}>
          <FavoriteIcon color={liked ?  "secondary" : "inherit"}/>
        </IconButton>
        <IconButton style={{position: 'relative'}} onClick={shareThisPost}
          disabled={createPost} aria-label="share">
          <ShareIcon style={{color: copied ? '#03a9f4' : 'inherit'}}/>
        </IconButton>
            {copied && <span style={{color: '#03a9f4'}}>copied</span>}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          disabled={createPost}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <CostumDialog  open={open} setOpen={setOpen} users={matchingUsers} title={dialogTitle}/>
    </Card> : ''

)}

export default Post;
