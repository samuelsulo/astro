import Post from '../models/post_model.js';
import User from '../models/user_model.js';

// fetch posts
export const fetchPosts = async(req, res) => {
    const { id } = req.body.user;

    try {
        const posts = await Post.find({ userId: { $ne: id } }, null, {sort: { createdAt: -1 }}).limit(20).select("-reports -image");

        if (!posts) return res.status(404).json({ message: "No posts yet" });
        
        const avatars = await User.find({}, "image username avatarColor");

        res.status(200).json({ posts: posts, avatars: avatars });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// fetche post image
export const fetchPostImage = async(req, res) => {
    const { id } = req.params;

    try {
        const postImage = await Post.findById(id, "image");

        res.status(200).json(postImage);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// fetch post by id 
export const fetchPost = async(req, res) => {
    const { id } = req.params;
    
    try {
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: "Post not found "});

        const avatar = await User.findById(post.userId, "image username avatarColor");

        res.status(200).json({ post: post, avatar: avatar });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" }); 
    }
}

// fetch user posts
export const fetchUserPosts = async(req, res) => {
    const { id } = req.body.user;
    
    try {
        const posts = await Post.find({ userId: id }, null, {sort: { createdAt: -1 }}).select("-reports -image");

        if (!posts) res.status(404).json({ message: "You have no posts."});

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// create post
export const createPost = async(req, res) => {
    const { id } = req.body.user;
    const { title, image, description} = req.body.post;
    const tags = handleTags(req.body.post.tags);

    try {
        const newPost = await Post.create({ userId: id, title: title, 
            image: image, description: description, tags: tags });

        res.status(200).json(newPost);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}

export const updatePost = async(req, res) => {
    const { id } = req.params;
    const { title, image, description } = req.body;
    const tags = handleTags(req.body.tags);

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, 
            { title: title, image: image, description: description, tags: tags }, { new: true });
        
        if (!updatedPost) res.status(404).json({ message: 'Post not found' });    

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}

export const deletePost = async(req, res) => {
    const { id } = req.params;
    
    try {
        const deletedPost = await Post.findByIdAndDelete(id);

        res.status(200).json(deletedPost._id);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}

export const likePost = async(req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id).select("likes");

        let index = -1;
        for (let i = 0; i < (post.likes).length; i++) {
            if (post.likes[i] === req.body.user.id) {
                index = i;
                post.likes.splice(i, i+1);
                break;
            }
        }

        if (index === -1)
            post.likes.push(req.body.user.id);

        await Post.findByIdAndUpdate(id, post);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
    
}

export const reportPost = async(req, res) => {
    const userId= req.body.user.id;
    const { id } = req.params;
    const { description } = req.body;

    try {
        await Post.findByIdAndUpdate(id, { $push: { reports: { user: userId, description: description } } });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

function handleTags(tags) {
    let arrTags = tags.split('#');
    
    for (let i = 0; i < arrTags.length - 1; i++) {
        arrTags[i] = '#' + arrTags[i + 1];
    }
    arrTags.pop();

    return arrTags;
}
