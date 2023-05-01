const { parseCookies } = require('../utils/cookieParserUtil');
const { setTokenCookies, validateToken, refreshTokens } = require('../utils/oauthTokensUtil');
const { getIdUserbyInvoice, getIdUserbyBooking, getIdUserByTicket } = require('../dao/userDAO');

async function authenticate(req, res, next) {
    try {
        const { accessToken, refreshToken } = parseCookies(req.headers.cookie);
        const accessTokenData = await validateToken(accessToken);

        if(!accessTokenData){
            //accessToken isn't valid - check refreshToken
            const refreshTokenData = await validateToken(refreshToken);

            if(!refreshTokenData){
                //refreshToken isn't valid - 401 unauthorized
                res.status(401).json({ error: "Unauthorized - Need to log in" });
            } else {
                //refreshToken is valid
                const {idUser, isAdmin} = refreshTokenData;
                const newTokens = await refreshTokens(refreshToken, idUser, isAdmin);

                if(newTokens){
                    res = setTokenCookies(res, newTokens);
                    req.idUser = idUser;
                    req.isAdmin = isAdmin;
                    next();
                } else {
                    //error generating new tokens
                    res.status(401).json({ error: "Unauthorized - Need to log in" });
                }
            }
        } else {
            const {idUser, isAdmin} = accessTokenData;
            req.idUser = idUser;
            req.isAdmin = isAdmin;
            next();
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

function authorizeAdmin(req, res, next){
    if(req.isAdmin){
        next();
    } else {
        res.status(403).json({ message: 'Forbidden - Need admin permissions.' });
    }
}

async function authorizeUser(req, res, next){
    try{
        let idUser = req.params.iduser || req.body.idUser;

        if(!idUser){
            const { idbooking, idinvoice, idticket } = req.params;
    
            if(idbooking){
                //mysql query to get idUser by idBooking
                idUser = await getIdUserbyBooking(idbooking);
                if(!idUser) {
                    res.status(404).json({ error: "Booking not found" });
                }
            } else if(idinvoice){
                //mysql query to get idUser by idInvoice
                idUser = await getIdUserbyInvoice(idinvoice);
                if(!idUser) {
                    res.status(404).json({ error: "Invoice not found" });
                }
            } else if(idticket){
                //mysql query to get idUser by idTicket
                idUser = await getIdUserByTicket(idticket);
                if(!idUser) {
                    res.status(404).json({ error: "Ticket not found" });
                }
            }
        }
    
        if(req.idUser === idUser){
            next();
        } else {
            res.status(403).json({ message: "Forbidden - This resource can only be accessed by its owner." });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function authorizeBoth(req, res, next) {
  try {
    if (req.isAdmin) {
      authorizeAdmin(req, res, next);
    } else {
      authorizeUser(req, res, next);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { authenticate, authorizeAdmin, authorizeUser, authorizeBoth };