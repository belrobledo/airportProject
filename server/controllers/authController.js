const userDAO = require('../dao/userDAO');
const { v4: uuidv4 } = require('uuid');
const { redisClient } = require('../databases/redis');

const accessTokenExpiration = 900;
const refreshTokenExpiration = 21600;

async function login(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json('Bad request params - need to provide email and password.');
    }

    try {
        const user = await userDAO.getUserByEmail(email);
        if(password === user.password){
            //generate tokens
            const tokens = generateTokens();

            //store tokens in Redis
            storeTokens(tokens, user);

            //set cookies with tokens in response header
            res.setHeader('Set-Cookie', [
                `accessToken=${tokens.accessToken}; HttpOnly; Max-Age=${accessTokenExpiration}; SameSite=lax;`,
                `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${refreshTokenExpiration}; SameSite=lax;`
            ]);

            //As login was succesful, redirects to '/home'
            res.status(200).redirect('/home');
        } else {
            //if credentials didn't match, redirects to '/'
            res.status(401).redirect('/');
        }
    } catch(error) {
        console.error(error);
        res.status(401).json(error);
    }
}

function generateTokens() {
    const accessToken = uuidv4();
    const refreshToken = uuidv4();
    return { accessToken, refreshToken };
}

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

module.exports = { login };