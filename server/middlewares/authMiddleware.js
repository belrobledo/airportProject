const { redisClient } = require('../databases/redis');
const { parseCookies } = require('../utils/cookieParserUtil');

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
                //refreshToken is valid - generateTokens
                
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

function parseCookies(cookieHeader){
    console.log("cookie header: ", cookieHeader);
    const cookies = {};
    if(cookieHeader){
        cookieHeader.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            cookies[parts[0].trim()] = decodeURIComponent(parts[1]);
        });
    }

    return cookies;
}

//If token is valid, returns tokenData. Else, returns null
async function validateToken(token = "") {
    try {
        const data = await redisClient.get(token);
        if (data === null) {
            return null;
        }
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = authenticate;