import express from 'express';
import { validationMiddleware } from "../../middlewares/validationMiddleware.js";
import { authTypes } from '../../constants/auth.js';
import { authorizationMiddleware } from '../../middlewares/authorizationMiddleware.js';
import { tutorialController } from "./tutorialController.js";
import { patchTutorialSchema, postTutorialSchema } from "./tutorialValidation.js";

export const tutorialRouter = express.Router({ mergeParams: true });

// Base Routes
tutorialRouter.get('/', 
    tutorialController.getAll
);

tutorialRouter.post('/', 
    authorizationMiddleware(authTypes.admin), 
    validationMiddleware(postTutorialSchema), 
    tutorialController.create
);

// ID Routes
tutorialRouter.get('/:id', 
    tutorialController.get
);

tutorialRouter.patch('/:id', 
    authorizationMiddleware(authTypes.admin), 
    validationMiddleware(patchTutorialSchema), 
    tutorialController.update
);

tutorialRouter.delete('/:id', 
    authorizationMiddleware(authTypes.admin), 
    tutorialController.delete
);

