const userDAO = require('../dao/userDAO');
const { generateTokens, storeTokens, setTokenCookies, deleteTokenCookies, deleteToken} = require('../utils/authTokensUtil');
const { parseCookies } = require('../utils/cookieParserUtil');

async function login(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(422).json('Unprocessable Entity - need to provide email and password.');
    }

    try {
        const user = await userDAO.getUserByEmail(email);
        if(password === user.password){
            //generate tokens
            const tokens = generateTokens();

            //store tokens in Redis
            storeTokens(tokens, user.id, user.role);

            //set cookies with tokens in response header
            res = setTokenCookies(res, tokens);

            //As login was succesful, redirects to '/home'
            res.status(200).redirect('/home');
        } else {
            //if credentials didn't match, redirects to '/'
            res.status(401).redirect('/');
        }
    } catch(error) {
        console.error(error);
        res.status(401).redirect('/');
    }
}

function logout(req, res){
    try {
        const { accessToken, refreshToken } = parseCookies(req.headers.cookie);

        deleteToken(accessToken);
        deleteToken(refreshToken);
        res = deleteTokenCookies(res);

        res.status(200).redirect('/');
    } catch (err) {
        console.error(`Error logging out: ${err}`);
        res.status(500).redirect('/');
    }
}

module.exports = { login, logout };