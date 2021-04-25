const express = require('express'),
      router  = express.Router(),
      User    = require('../models/user.model');

router.post('/signup', async (req, res) => {
    const { username, password1, password2 } = req.body;
    if( !username || !password1 || !password2 ) {
        return res.status(500).json({ error: 'Please enter all the required fields' });
    }
    if( password1 !== password2 ) {
        return res.status(500).json({ error: 'Passwords doesnt match' });
    }
    // if ( ( await User.findOne( { usernamme } ) ) ) {
    //     return res.status(500).json({ error: 'User with this username already exists' });
    // }
    try {
        const user = await User.create({ username, password: password1 })
        if(!user) {
            return res.status(500).json({ error: 'Error while creating new user' });
        }
        res.status(201).json({ message: 'success', user: { username: user.username, _id: user._id } });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if( !username || !password ) {
        return res.status(500).json({ error: 'Please enter all the required fields' });
    }
    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(404).json({ error: 'No such user exists' });
        }
        if(user.password !== password) 
            return res.status(403).json({ error: 'Password incorrect' });
        res.status(200).json({ message: 'success', user: { username: user.username, _id: user._id } });
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
});

module.exports = router;