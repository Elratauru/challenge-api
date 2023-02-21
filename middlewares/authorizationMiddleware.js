import createError from 'http-errors';

export const authorizationMiddleware = (authType) => {  
    return async (req, res, next) => {    
        if(res.locals.authType != authType){
            return next(createError(403, 'You do not have the permission for this action.'))
        };
        next();
    }
}