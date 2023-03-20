const { v4: uuidv4 } = require('uuid');
const { redisClient } = require('../databases/redis');

const accessTokenExpiration = 900;
const refreshTokenExpiration = 21600;

//generates a new pair of tokens
function generateTokens() {
    const accessToken = uuidv4();
    const refreshToken = uuidv4();
    return { accessToken, refreshToken };
}

//store tokens pair in redis db
function storeTokens(tokens, user){
    try {
        redisClient.set(
            tokens.accessToken, 
            JSON.stringify({tokenType: "access", userId: user.id, userRole: user.role}),
            'EX', accessTokenExpiration
        );
        redisClient.expire(tokens.accessToken, accessTokenExpiration);

        redisClient.set(
            tokens.refreshToken,
            JSON.stringify({tokenType: "refresh", userId: user.id, userRole: user.role}),
            'EX', refreshTokenExpiration
        );
        redisClient.expire(tokens.refreshToken, refreshTokenExpiration);

    } catch (error) {
        console.error(`Error storing tokens in Redis: ${error}`);
        throw error;
    }
}

//SetCookies with access and refresh tokens.
function setCookies(res, tokens){
    res.setHeader('Set-Cookie', [
        `accessToken=${tokens.accessToken}; HttpOnly; Max-Age=${accessTokenExpiration}; SameSite=lax;`,
        `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${refreshTokenExpiration}; SameSite=lax;`
    ]);

    return res;
}

//Validate a token. If valid, returns tokenData. Else, returns null
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

module.exports = { generateTokens, storeTokens, setCookies, validateToken };