// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     console.log("Request params:", req.params);

//     const token = req.params.token;
//     console.log("Token:", token);

//     if (!token) {
//         return res.status(401).json({ error: 'Access denied, token missing' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ error: 'Invalid token' });
//         }

//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;


const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    // console.log("authorizationHeader", authorizationHeader);

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    const tokenArray = authorizationHeader.split(' ');

    if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid Authorization header format' });
    }

    const token = tokenArray[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
