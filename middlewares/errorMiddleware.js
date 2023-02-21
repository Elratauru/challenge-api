export const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 400;

    if (statusCode >= 500) {
        console.error(error);
    } else {
        console.warn(error);
    }

    res.status(statusCode).json({
        code: statusCode,
        message: error.name || 'There was a problem trying to fulfill your request.',
        details: error.message || '',
    });

    next(error);
};
