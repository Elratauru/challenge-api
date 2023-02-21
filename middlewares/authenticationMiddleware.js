import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { privateKey } from '../constants/env.js';

const unprotectedEndpoints = [
    '/auth',
    '/status',
];

export const authenticationMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;

    // If it's unprotected, then continue.
    let foundInUnprotected = unprotectedEndpoints.find( obj => obj == req.originalUrl );
    if(typeof foundInUnprotected !== 'undefined' && foundInUnprotected) return next();

    // If not, then it's protected. Review authorization.
    if (!authorization) {
        console.warn('Credentials not found.');
        return next(createError(403, 'Credentials not found.'));
    }

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, privateKey, function(err, decoded) {
        if(err){
            return next(createError(403, err));
        }

        // Setup the authType to the token type for later use.
        res.locals.authType = decoded.authType;
    });

    next();
}