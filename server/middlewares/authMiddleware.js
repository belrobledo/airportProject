function authenticate(req, res, next) {
    if (!req.session || !req.session.user) {
        const error = new Error("Session doesn't exist.");
        error.statusCode = 401;
        next(error);
    }
    next();
}

module.exports = authenticate;