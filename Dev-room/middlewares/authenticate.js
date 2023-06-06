const jwt = require("jsonwebtoken");

let authenticate = async (request, response, next) => {
  try {
    let token;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      token = request.headers.authorization.split(" ")[1]; // Bearer {token}
    }
    if (!token) {
      response.status(401).json({ msg: "User unauthorized" });
    }

    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);   
    request.user = verifiedToken.user;
     console.log(request.user);
    next();
    
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Invalid Token" });
  }
};
module.exports = authenticate;
