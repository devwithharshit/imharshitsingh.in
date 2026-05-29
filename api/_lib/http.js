function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function methodNotAllowed(res, allowedMethods) {
  res.setHeader("Allow", allowedMethods.join(", "));
  return json(res, 405, {
    ok: false,
    error: "Method not allowed"
  });
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (_error) {
      throw new Error("Invalid JSON body");
    }
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    throw new Error("Invalid JSON body");
  }
}

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) {
    return {};
  }

  return header.split(";").reduce(function (acc, item) {
    const trimmed = item.trim();
    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      return acc;
    }
    const key = trimmed.slice(0, separator);
    const value = trimmed.slice(separator + 1);
    try {
      acc[key] = decodeURIComponent(value);
    } catch (_error) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

function setCookie(res, cookieValue) {
  res.setHeader("Set-Cookie", cookieValue);
}

function noStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
}

module.exports = {
  json,
  methodNotAllowed,
  readBody,
  parseCookies,
  setCookie,
  noStore
};
