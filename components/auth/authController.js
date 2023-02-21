import jwt from 'jsonwebtoken';
import createError from "http-errors";
import { databaseService } from "../database/databaseService.js";
import { privateKey } from '../../constants/env.js';

export const authController = {
    async post(req, res, next) {
        // Check DB for sent information.
        let user = await databaseService.execute(
            `SELECT id, r.name as role_name FROM user u 
             INNER JOIN user_roles ur on ur.user_id = u.id
             INNER JOIN roles r on r.role = ur.role_id
             WHERE email = ? and password = ?`, [req.body.email, req.body.password]
        );

        // Check for wrong creds.
        if(!user.id) return createError(401, 'This information doesn\'t match any credentials.');

        const tokenToSign = {
            exp: Math.floor(Date.now() / 1000) + (60 * 5),
            authType: user.role_name,
            email: req.body.email
        };

        const response = {
            code: 200,
            token: jwt.sign(tokenToSign, privateKey),
        };

        return res.json(response);
    },
}
