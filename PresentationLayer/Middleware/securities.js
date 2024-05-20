const loginAttempts = {};

function preventBrutforce(req,res,next){
    const ip = req.ip
    if (!loginAttempts[ip]) {
        loginAttempts[ip] = { count: 0, lastAttempt: null, blockedUntil: null,blockedCount:0 };
    }

    const attempt = loginAttempts[ip];

    if (attempt.blockedUntil && Date.now() < attempt.blockedUntil) {
        let duration = new Date(attempt.blockedUntil - Date.now())
        return res.status(429).send({message:`Trop de tentatives de connexion, réessayez dans ${duration.getMinutes()} minutes et ${duration.getSeconds()} seconde.`});
    }
    req.attemps = loginAttempts
    next()
}


module.exports = { preventBrutforce }