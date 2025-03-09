import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const comparePassword = async (password, hash) => await bcrypt.compare(password, hash);
export const signToken = (user) => jwt.sign({
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin
}, process.env.JWT_SECRET, {expiresIn: "1d"});
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);