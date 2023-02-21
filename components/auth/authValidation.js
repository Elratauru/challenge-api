import Joi from 'joi';

const baseSchema = {
    email: Joi.string().required().description('The email to auth with.'),
    password: Joi.string().required().description('The password to auth with.'),
};

export const postAuthSchema = {
    body: baseSchema,
};
