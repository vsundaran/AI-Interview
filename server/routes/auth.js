const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sign-In
router.post('/google-signin', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub: googleId, email, name, picture } = ticket.getPayload();

        // Check if user exists in DB
        let user = await User.findOne({ googleId });
        if (!user) {
            user = await User.create({ googleId, email, name, picture });
        }

        // Generate JWT
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.json({ token: jwtToken, user });
    } catch (error) {
        res.status(400).json({ error: 'Invalid Google Token' });
    }
});

module.exports = router;
