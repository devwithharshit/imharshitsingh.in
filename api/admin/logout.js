const { json, methodNotAllowed, noStore, setCookie } = require("../_lib/http");
const { clearCookie } = require("../_lib/auth");

module.exports = async function handler(req, res) {
  noStore(res);

  if (req.method !== "POST") {
    return methodNotAllowed(res, ["POST"]);
  }

  setCookie(res, clearCookie());

  return json(res, 200, {
    ok: true
  });
};
