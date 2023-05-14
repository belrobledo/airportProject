function parseCookies(cookieHeader){
    const cookies = {};
    
    if(cookieHeader){
        cookieHeader.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            cookies[parts[0].trim()] = decodeURIComponent(parts[1]);
        });
    }

    return cookies;
}

module.exports = { parseCookies };