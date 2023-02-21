import express from "express";
import { authController } from './authController.js';
import { postAuthSchema } from "./authValidation.js";
import { validationMiddleware } from "../../middlewares/validationMiddleware.js";

export const authRouter = express.Router({ mergeParams: true });

// Base Routes
authRouter.post('/', 
    validationMiddleware(postAuthSchema), 
    authController.post
);
