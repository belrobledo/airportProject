const { v4: uuidv4 } = require('uuid');
const { redisClient } = require('../databases/redis');

const accessTokenExpiration = 900;
const refreshTokenExpiration = 21600;

//Generates a new pair of tokens
function generateTokens() {
    const accessToken = uuidv4();
    const refreshToken = uuidv4();
    return { accessToken, refreshToken };
}

//Store tokens pair in redis db
function storeTokens(tokens, userId, userRole){
    try {
        redisClient.set(
            tokens.accessToken, 
            JSON.stringify({tokenType: "access", userId: userId, userRole: userRole}),
            'EX', accessTokenExpiration
        );
        redisClient.expire(tokens.accessToken, accessTokenExpiration);

        redisClient.set(
            tokens.refreshToken,
            JSON.stringify({tokenType: "refresh", userId: userId, userRole: userRole}),
            'EX', refreshTokenExpiration
        );
        redisClient.expire(tokens.refreshToken, refreshTokenExpiration);

    } catch (error) {
        console.error(`Error storing tokens in Redis: ${error}`);
        throw error;
    }
}

//SetCookies with access and refresh tokens.
function setTokenCookies(res, tokens){
    res.setHeader('Set-Cookie', [
        `accessToken=${tokens.accessToken}; HttpOnly; Max-Age=${accessTokenExpiration}; SameSite=lax;`,
        `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${refreshTokenExpiration}; SameSite=lax;`
    ]);

    return res;
}

//SetCookies with access and refresh tokens.
function deleteTokenCookies(res){
    res.setHeader('Set-Cookie', [
        `accessToken=""; HttpOnly; Max-Age=0; SameSite=lax;`,
        `refreshToken=""; HttpOnly; Max-Age=0; SameSite=lax;`
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

function refreshTokens(refreshToken, userId, userRole){
    try{
        deleteToken(refreshToken);
        const tokens = generateTokens();
        storeTokens(tokens, userId, userRole);

        return tokens;
    } catch (err) {
        console.error(`Error refreshing tokens: ${err}`);
        return null;
    }
}

//Delete a token from redis storage
function deleteToken(token){
    try {
        redisClient.del(token);
    } catch (err) {
        console.error(`Error deleting token in Redis: ${err}`);
        throw err;
    }
}

module.exports = { generateTokens, storeTokens, setTokenCookies, deleteTokenCookies, validateToken, refreshTokens, deleteToken };