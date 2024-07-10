const jwt = require("jsonwebtoken");

const secrete = "rajatdalal";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImgURL: user.profileImgURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secrete);
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secrete);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
