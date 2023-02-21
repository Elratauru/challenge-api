import Joi from 'joi';
import createError from "http-errors";

export const validationMiddleware = (schema) => {
    return async (req, res, next) => {
        let validSchema = Joi.isSchema(schema) ? schema : Joi.object(schema);

        try {
            // If exists in schema, validate the following:
            if(schema.params) await validSchema.validateAsync({ params: req.params });
            if(schema.body) await validSchema.validateAsync({ body: req.body });
        } catch (error) {
            // Else throw an error with the failed validation.
            return next(createError(400, error.message));
        }
    
        return next();
    }
}