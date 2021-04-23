const User = require("../models/user.model");

function isAuthenticated(req, res, next) {
    const {authToken} = req.headers;
    if(!authToken) {
        return res.send(401).json( { error: 'User not authenticated. Please sign in' } );
    }
    try {
        const user = User.findById(authToken);
        if(!user) {
            return res.send(500).json( { error: 'Auth token is invalid. Please signin again' });
        }
        req.user = user;
        next(); 
    } catch(err) {
        console.log(err);
        return res.send(500).json( { error: 'Something went wrong while fetching user details' });
    }
}

module.exports = isAuthenticated;