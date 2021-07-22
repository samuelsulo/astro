import mongoose from 'mongoose';

// definizione di uno schema per il database
// in seguito utilizzato per creare dei documenti
const postSchema = mongoose.Schema({
    userId: { type: String, required:  true },
    title: { type: String, required:  true },
    image: { type: String, required:  true },
    description: { type: String, required:  true },
    tags: [String],
    reports: [{ user: String, description: String} ],
    likes: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// creazione dello schema precedentemente definito
var Post = mongoose.model('Post', postSchema);

// esporta lo schema(modello oppure classe)
export default Post;