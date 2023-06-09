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
async function storeTokens(tokens, idUser, isAdmin){
    try {
        await redisClient.set(
            tokens.accessToken, 
            JSON.stringify({tokenType: "access", idUser: idUser, isAdmin: isAdmin}),
            'EX', accessTokenExpiration
        );
        await redisClient.expire(tokens.accessToken, accessTokenExpiration);

        await redisClient.set(
            tokens.refreshToken,
            JSON.stringify({tokenType: "refresh", idUser: idUser, isAdmin: isAdmin}),
            'EX', refreshTokenExpiration
        );
        await redisClient.expire(tokens.refreshToken, refreshTokenExpiration);

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

async function refreshTokens(refreshToken, idUser, isAdmin){
    try{
        await deleteToken(refreshToken);
        const tokens = generateTokens();
        await storeTokens(tokens, idUser, isAdmin);

        return tokens;
    } catch (err) {
        console.error(`Error refreshing tokens: ${err}`);
        return null;
    }
}

//Delete a token from redis storage
async function deleteToken(token = ""){
    try {
        await redisClient.del(token);
    } catch (err) {
        console.error(`Error deleting token in Redis: ${err}`);
        throw err;
    }
}

module.exports = { generateTokens, storeTokens, setTokenCookies, deleteTokenCookies, validateToken, refreshTokens, deleteToken };