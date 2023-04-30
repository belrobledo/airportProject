const { parseCookies } = require('../utils/cookieParserUtil');
const { setTokenCookies, validateToken, refreshTokens } = require('../utils/oauthTokensUtil');

async function authenticate(req, res, next) {
    try {
        const { accessToken, refreshToken } = parseCookies(req.headers.cookie);
        const accessTokenData = await validateToken(accessToken);

        if(!accessTokenData){
            //accessToken isn't valid - check refreshToken
            const refreshTokenData = await validateToken(refreshToken);

            if(!refreshTokenData){
                //refreshToken isn't valid - 401 unauthorized
                res.status(401).json({ error: "Unauthorized - Log in again" });
            } else {
                //refreshToken is valid
                const {idUser, isAdmin} = refreshTokenData;
                const newTokens = refreshTokens(refreshToken, idUser, isAdmin);

                if(newTokens){
                    res = setTokenCookies(res, newTokens);
                    req.idUser = idUser;
                    req.isAdmin = isAdmin;
                    next();
                } else {
                    //error generating new tokens
                    res.status(401).json({ error: "Unauthorized - Log in again" });
                }
            }
        } else {
            const {idUser, isAdmin} = accessTokenData;
            req.idUser = idUser;
            req.isAdmin = isAdmin;
            next();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = authenticate;