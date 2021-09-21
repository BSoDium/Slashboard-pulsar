const c = require("config");
const citadel = require("../services/citadel");
const os = require("os");


exports.attemptAuthentication = async (req, res) => {
    const { serverKey, jwtLifetime, sharedSecret } = c.get('security');
    const { secretKey: sentSecret } = req.body;
    const cit = new citadel.Citadel();
    if (await cit.verifyPassword(sentSecret, cit.encodePasswordSync(sharedSecret))) {
        return res.status(200).json({bearer: cit.makeJWT(appContext.hostname, jwtLifetime, serverKey)});
    } else {
        return res.status(401).json({ error: "Could not authenticate client" });
    }
}
