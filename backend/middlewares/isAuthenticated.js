const User = require("../models/user.model");

async function isAuthenticated(req, res, next) {
    const {authtoken} = req.headers;
    if(!authtoken) {
        return res.status(401).json( { error: 'User not authenticated. Please sign in' } );
    }
    try {
        const user = await User.findById(authtoken);
        if(!user) {
            return res.status(500).json( { error: 'Auth token is invalid. Please signin again' });
        }
        req.user = user;
        next(); 
    } catch(err) {
        console.log(err);
        return res.status(500).json( { error: 'Something went wrong while fetching user details' });
    }
}

module.exports = isAuthenticated;