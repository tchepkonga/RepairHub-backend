const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (role = null) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const user = await User.findOne({ _id: decoded._id });

            if (!user) {
                throw new Error();
            }

            // If a role is specified in the middleware, check it against the user's role
            if (role && role !== decoded.role) {
                return res.status(403).send({ error: 'Insufficient permissions.' });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).send({ error: 'Authentication required.' });
        }
    }
}

module.exports = auth;
