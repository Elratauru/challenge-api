import Joi from 'joi';

const idExample = 'a1b2d3c4d5';
const elementDefaultName = 'New Tutorial';
const exampleURL = 'http://www.google.com';

const paramsIdSchema = {
    id: Joi.string().required().example(idExample).description('The ID to use.'),
};

const baseSchema = {
    title: Joi.string()
        .example(elementDefaultName)
        .description('The Tutorial name'),
    video_url: Joi.string().uri()
        .example(exampleURL)
        .description('An URL for the Tutorial'),
    description: Joi.string()
        .example('Short Description')
        .description('A Short Description for the Tutorial'),
    published_status: Joi.number().integer().valid(1,2)
        .example(1)
        .description('The published status.')
};

export const postTutorialSchema = {
    body: {
        ...baseSchema,
        title: baseSchema.title.required(),
        published_status: baseSchema.published_status.required(),
    },
};

export const patchTutorialSchema = {
    body: baseSchema,
    params: paramsIdSchema,
}
