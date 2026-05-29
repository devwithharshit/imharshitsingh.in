const { json, methodNotAllowed, readBody, noStore, setCookie } = require("../_lib/http");
const { getAdminConfig } = require("../_lib/config");
const { createToken, buildCookie, safeEqual } = require("../_lib/auth");

module.exports = async function handler(req, res) {
  noStore(res);

  if (req.method !== "POST") {
    return methodNotAllowed(res, ["POST"]);
  }

  const admin = getAdminConfig();

  if (!admin.password || !admin.sessionSecret) {
    return json(res, 503, {
      ok: false,
      error: "Admin auth is not configured on server"
    });
  }

  try {
    const body = await readBody(req);
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    const usernameOk = safeEqual(username, admin.username);
    const passwordOk = safeEqual(password, admin.password);

    if (!usernameOk || !passwordOk) {
      return json(res, 401, {
        ok: false,
        error: "Invalid credentials"
      });
    }

    const token = createToken(admin.username, admin.sessionSecret);
    setCookie(res, buildCookie(token));

    return json(res, 200, {
      ok: true,
      user: {
        username: admin.username
      }
    });
  } catch (error) {
    return json(res, 400, {
      ok: false,
      error: error.message || "Invalid request"
    });
  }
};
