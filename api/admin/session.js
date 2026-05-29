const { json, methodNotAllowed, noStore } = require("../_lib/http");
const { getAdminConfig } = require("../_lib/config");
const { getSessionFromRequest } = require("../_lib/auth");

module.exports = async function handler(req, res) {
  noStore(res);

  if (req.method !== "GET") {
    return methodNotAllowed(res, ["GET"]);
  }

  const admin = getAdminConfig();
  const session = getSessionFromRequest(req, admin.sessionSecret);

  if (!session) {
    return json(res, 401, {
      ok: false,
      authenticated: false
    });
  }

  return json(res, 200, {
    ok: true,
    authenticated: true,
    user: {
      username: session.sub
    }
  });
};
