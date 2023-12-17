const jwt = require("jsonwebtoken");
const secretkey = process.env.JWT_KEY;

const User = require("../models/user");

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    try{
        const decodedToken = jwt.verify(token,secretkey);
        const userId = decodedToken;
        const user = user;
        console.log(req.user.id);
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});

    }
}
module.exports = verifyToken;