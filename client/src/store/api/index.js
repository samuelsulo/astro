import axios from 'axios';

// Base API
const server = "https://server.astroland.xyz";
const API = axios.create({ 
    baseURL: 'http://localhost:5000', 
    withCredentials: 'include',
});

// auth apis
export const signIn = (user, checkbox) => API.post('/auth/signin', {user: user, checked: checkbox });
export const signUp = (user, checkbox) => API.post('/auth/signup', {user: user, checked: checkbox });
export const forgotPassword = (email) => API.post('/auth/password/forgot', { email: email });
export const resetPassword = (password, token) => API.patch('/auth/password/reset', { password: password, token: token });
export const logout = () => API.get('/auth/logout');

// user apis
export const getUser = () => API.get('/user');
export const updateProfile = (updatedUser) => API.patch('/user', updatedUser);
export const fetchUsers = () => API.get('/user/users');
export const followProfile = (id) => API.patch(`/user/follow/${id}`);

// post apis
export const fetchPosts = () => API.get('/posts');
export const fetchPostImage = (id) => API.get(`/posts/post/image/${id}`);
export const fetchUserPosts = () => API.get('/posts/user');
export const createPost = (post) => API.post('/posts', { post: post });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/like/${id}`);
export const reportPost = (description, id) => API.patch(`/posts/report/${id}`, { description: description});
export const fetchPost = (id) => API.get(`/posts/post/${id}`);

// utilities
export const contactUs = (formData) => API.post('/user/contact', formData);
export const getSearchedUser = (username) => API.get(`/user/searchedUser/${username}`);
