const crypto = require('node:crypto');
const util = require('node:util');
const jwt = require("jsonwebtoken");
const c = require('config');

const scryptPromise = util.promisify(crypto.scrypt);

/**
 * Class with security utilities for the server
 */
exports.Citadel = class Citadel {

    static clampedDuration(value, min, max) {
        let duration;
        if (value >= max) {
            duration = max;
        } else if (value <= min) {
            duration = min;
        } else {
            duration = value;
        }
        return Math.floor(Date.now() / 1000) + duration;
    }

    async encodePassword(password) {
        const salt = crypto.randomBytes(16);
        const hash = await scryptPromise(password, salt, 64);
        return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
    }

    encodePasswordSync(password) {
        const salt = crypto.randomBytes(16);
        const hash = crypto.scryptSync(password, salt, 64);
        return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
    }

    async verifyPassword(toVerify, against) {
        const againstParts = against.split('$');
        if (againstParts.length > 0) {
            const salt = Buffer.from(againstParts[1], 'hex');
            const hash = Buffer.from(againstParts[2], 'hex');
            const toCompare = await scryptPromise(toVerify, salt, 64);
            return crypto.timingSafeEqual(toCompare, hash);
        } else {
            throw Error('Malformed hashed password string');
        }
    }

    makeJWT(host, lifetime, key) {
        return jwt.sign({
            jti: crypto.randomUUID(),
            iss: host,
            exp: Citadel.clampedDuration(lifetime, 60, 259200),
        }, Buffer.from(key, 'base64'));
    }

    static checkJWT(token, host, key, parse = true) {
        let tokenParsed;
        if (parse) {
            const split = token.split(" ");
            tokenParsed = split[1];
        } else {
            tokenParsed = token;
        }
        try {
            return jwt.verify(tokenParsed, Buffer.from(key, "base64"), { issuer: host })
        } catch (error) {
            return false
        }
    }
}
