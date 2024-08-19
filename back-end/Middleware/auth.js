const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ errors: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ errors: "Invalid token" });
    console.log(error);
  }
};

module.exports = fetchUser
