import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.access_token;
    
        let decodedData = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

        req.body.user = decodedData;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Expired token' });
    }
};

export default auth;