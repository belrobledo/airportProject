const userDAO = require('../dao/userDAO');
const { v4: uuidv4 } = require('uuid');
const { redisClient } = require('../redis/redis');

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
            console.log("connecting to redis...");
            redisClient.connect().then( () => {
                console.log("redis connected");
                storeTokens(tokens, user);
            })

            //set cookies with tokens in response header
            res.setHeader('Set-Cookie', [
                `accessToken=${tokens.accessToken}; HttpOnly; Max-Age=${accessTokenExpiration}; SameSite=lax;`,
                `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${refreshTokenExpiration}; SameSite=lax;`
            ]);
            
            return res.status(200).json('Authorized - Ok.');
        } else {
            return res.status(401).json('Unauthorized - Wrong email or password.');
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

async function storeTokens(tokens, user){
    try {
        await redisClient.set(
            tokens.accessToken, 
            JSON.stringify({tokenType: "access", userId: user.id, userRole: user.role}),
            'ex', accessTokenExpiration
        );

        await redisClient.set(
            tokens.refreshToken,
            JSON.stringify({tokenType: "refresh", userId: user.id, userRole: user.role}),
             'ex', refreshTokenExpiration
        );
    } catch (error) {
        console.error(`Error storing tokens in Redis: ${error}`);
        throw error;
    }
}

module.exports = { login };