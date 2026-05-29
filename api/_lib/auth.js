const crypto = require("crypto");
const { parseCookies } = require("./http");

const COOKIE_NAME = "hs_admin_session";

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function createToken(username, secret) {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const payload = Buffer.from(
    JSON.stringify({
      sub: username,
      exp
    }),
    "utf8"
  ).toString("base64url");

  const signature = sign(payload, secret);
  return payload + "." + signature;
}

function verifyToken(token, secret) {
  if (!token || !secret) {
    return null;
  }

  const segments = token.split(".");
  if (segments.length !== 2) {
    return null;
  }

  const payload = segments[0];
  const signature = segments[1];
  const expectedSignature = sign(payload, secret);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!decoded.exp || Date.now() > decoded.exp) {
      return null;
    }
    return decoded;
  } catch (_error) {
    return null;
  }
}

function buildCookie(token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return COOKIE_NAME +
    "=" + encodeURIComponent(token) +
    "; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200" + secure;
}

function clearCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return COOKIE_NAME +
    "=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0" + secure;
}

function getSessionFromRequest(req, secret) {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  return verifyToken(token, secret);
}

module.exports = {
  COOKIE_NAME,
  createToken,
  verifyToken,
  buildCookie,
  clearCookie,
  getSessionFromRequest,
  safeEqual
};
