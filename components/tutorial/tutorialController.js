import createError from "http-errors";
import { tutorialService } from './tutorialService.js';

export const tutorialController = {
    async getAll(req, res, next) {
        try {
            const response = {
                code: 200,
                data: await tutorialService.getAll(
                    req.query.limit
                ),
            };

            return res.json(response);
        } catch (e) {
            console.error(e);
            return next(createError(500, 'Something went wrong'));
        }
    },

    async get(req, res, next) {
        try {
            let record = await tutorialService.get(req.params.id);
            if(!record) return next(createError(404, 'The Record doesn\'t exist!'));

            const response = {
                code: 200,
                data: record,
            };

            return res.json(response);
        } catch (e) {
            console.error(e);
            return next(createError(500, 'Something went wrong'));
        }
    },

    async create(req, res, next) {
        try {
            return res.status(201).json({
                code: 201,
                data: await tutorialService.create(
                    req.body,
                ),
            });
        } catch (e) {
            console.error(e);
            return next(createError(500, 'Something went wrong'));
        }
    },

    async update(req, res, next) {
        let record = await tutorialService.get(
            req.params.id,
        )
        if(!record) return next(createError(404, 'The Record doesn\'t exist!')) 

        try {
            return res.status(200).json({
                code: 200,
                data: await tutorialService.update(
                    req.params.id,
                    req.body,
                ),
            });
        } catch (e) {
            console.error(e);
            return next(createError(500, 'Something went wrong'));
        }
    },

    async delete(req, res, next) {
        // Try and get the record first.
        let record = await tutorialService.get(
            req.params.id,
        )
        if(!record) return next(createError(404, 'The Record doesn\'t exist!')) 

        try {
            await tutorialService.delete(
                req.params.id,
            )

            return res.status(204).send();
        } catch (e) {
            console.error(e);
            return next(createError(500, 'Something went wrong'));
        }
    },
}
