const { parseCookies } = require('../utils/cookieParserUtil');
const { setTokenCookies, validateToken, refreshTokens } = require('../utils/authTokensUtil');

async function authenticate(req, res, next) {
    try {
        const { accessToken, refreshToken } = parseCookies(req.headers.cookie);
        console.log("TOKENS: ", accessToken, refreshToken);

        //const {userId, userRole} = await validateToken(accessToken);
        const accessTokenData = await validateToken(accessToken);
        console.log("accessTokenData:", accessTokenData);

        if(!accessTokenData){
            //accessToken isn't valid - check refreshToken
            const refreshTokenData = await validateToken(refreshToken);
            console.log("refreshTokenData:", refreshTokenData);

            if(!refreshTokenData){
                //refreshToken isn't valid - 401 unauthorized and redirect.
                res.status(401).redirect('/');
            } else {
                //refreshToken is valid
                const {userId, userRole} = refreshTokenData;
                const newTokens = refreshTokens(refreshToken, userId, userRole);
                if(newTokens){
                    res = setTokenCookies(res, newTokens);

                    console.log("userID: ", userId);
                    console.log("userRole: ", userRole);

                    next();
                } else {
                    //error generating new tokens
                    res.status(401).redirect('/');
                }
            }
        } else {
            const {userId, userRole} = accessTokenData;
            console.log("userID: ", userId);
            console.log("userRole: ", userRole);

            next();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = authenticate;