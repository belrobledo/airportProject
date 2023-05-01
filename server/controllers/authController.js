const argon2 = require('argon2');
const { userLogin } = require('../dao/userDAO');
const { generateTokens, storeTokens, setTokenCookies, deleteTokenCookies, deleteToken} = require('../utils/oauthTokensUtil');
const { parseCookies } = require('../utils/cookieParserUtil');

async function login(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: 'Unprocessable Entity - need to provide email and password.' });
    }

    try {
        const user = await userLogin(email);
        const isVerified = await argon2.verify(user.passwordHash, password);

        if(isVerified){
            //generate tokens
            const tokens = generateTokens();

            //store tokens in Redis
            storeTokens(tokens, user.idUser, user.isAdmin);

            //set cookies with tokens in response header
            res = setTokenCookies(res, tokens);

            //login succesful
            res.status(200).json({ message: "Ok - logged in" });
        } else {
            //if credentials didn't match
            res.status(401).json({ error: "Unauthorized - credentials didn't match." });
        }
    } catch(err) {
        console.error(`Error logging in: ${err}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function logout(req, res){
    try {
        const { accessToken, refreshToken } = parseCookies(req.headers.cookie);

        await deleteToken(accessToken);
        await deleteToken(refreshToken);
        res = deleteTokenCookies(res);

        res.status(200).json({ message: "Ok - logged out" });
    } catch (err) {
        console.error(`Error logging out: ${err}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { login, logout };