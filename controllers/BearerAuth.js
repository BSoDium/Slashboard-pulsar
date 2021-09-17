const c = require("config");
const citadel = require("../services/citadel");
const os = require("os");


exports.attemptAuthentication = async (req, res) => {
    const { serverKey, jwtLifetime, username, password } = c.get('security');
    const { username: sentUser, password: sentPassword } = req.body;
    const cit = new citadel.Citadel();
    if (username === sentUser && await cit.verifyPassword(sentPassword, cit.encodePasswordSync(password))) {
        return res.status(200).json({bearer: cit.makeJWT(appContext.hostname, jwtLifetime, serverKey)});
    } else {
        return res.status(401).json({ error: "Could not authenticate client" });
    }
}
