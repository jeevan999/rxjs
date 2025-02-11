const jwt = require("jsonwebtoken");
const JWT_SECRET = "e9b1c6bff09b60c3a5e3e24d5a9a1c31728c5b24ad6f76de5d9e21dfcd2e1b52";


function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
}


module.exports={verifyToken}