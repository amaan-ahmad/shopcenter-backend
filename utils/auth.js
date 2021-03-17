const jwt = require("jsonwebtoken");

async function getPayload(req) {
  try {
    if (!(req && req.headers && req.headers.authorization)) {
      throw new Error("No authorization token found.");
    }

    const { authorization } = req.headers;

    return jwt.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
}

module.exports = getPayload;
