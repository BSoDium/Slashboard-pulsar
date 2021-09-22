const c = require("config");
const citadel = require("../services/citadel");


exports.attemptAuthentication = async (req, res) => {
    const { serverKey, jwtLifetime, sharedSecret } = c.get('security');
    const { auth: sentSecret } = req.body;

    const cit = new citadel.Citadel();
    if (sentSecret && await cit.verifyPassword(sentSecret, cit.encodePasswordSync(sharedSecret))) {
        return res.status(200).json({ bearer: cit.makeJWT(appContext.hostname, jwtLifetime, serverKey) });
    } else {
        return res.status(401).json({ error: "Could not authenticate client" });
    }
}
