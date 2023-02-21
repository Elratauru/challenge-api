import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import { authRouter } from './components/auth/authRouter.js';
import { tutorialRouter } from './components/tutorial/tutorialRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { authenticationMiddleware } from './middlewares/authenticationMiddleware.js';

const app = express();
const port = 3000;

// Define some basic middlewares.
const middlewares = [
    cors(),
    express.urlencoded({ extended: true }),
    express.json(),
];
app.use(middlewares);

// Setup Auth Middleware
app.use(authenticationMiddleware);

// Routes.
app.use('/auth', authRouter);
app.use('/tutorials', tutorialRouter);

// Basic Route.
app.get('/status', (req, res) => {
    res.send('API is up and running.');
})

// Just in case users try any other endpoint, return a friendlier 404.
app.use((req, res, next) => {
    console.warn('Resource not found');
    next(createError(404, 'This path cannot be found.'));
});

// Catch and parse final errors.
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Welcome to the Challenge API! \nAPI is now listening on port ${port}`)
})
