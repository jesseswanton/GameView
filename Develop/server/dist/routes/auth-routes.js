import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import pkg from 'pg';
const { Pool } = pkg;
const router = Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// Check if username is available
router.post('/check-username', async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    try {
        // Check if the username exists in the database
        const existingUser = await User.findOne({
            where: { username },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }
        console.log('Username is available' + username);
        // Username is available
        return res.status(200).json({ message: 'Username is available' });
    }
    catch (error) {
        console.error('Error checking username:', error);
        return res.status(500).json({ message: 'Failed to check username availability' });
    }
});
const register = async (req, res) => {
    const { username, password, confirmPassword, email } = req.body;
    const existingUser = await User.findOne({
        where: { username },
    });
    if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing with 10 rounds
    try {
        const newUser = await User.create({ username, password: hashedPassword, email });
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });
        return res.status(201).json({ token });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Failed to register user' });
    }
};
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username },
    });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
};
// POST /login - Login a user
router.post('/login', login);
// POST /register - Register a new user
router.post('/register', register);
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the email exists in the database
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Email not found' });
        }
        // Generate a temporary password
        const tempPassword = crypto.randomBytes(8).toString('hex'); // Random 16-character string
        // Hash the temporary password before updating the database
        const hashedPassword = crypto.createHash('sha256').update(tempPassword).digest('hex');
        // Update the user record with the new temporary password
        await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
        // Return the temporary password to the frontend
        return res.status(200).json({ success: true, tempPassword });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
export default router;
