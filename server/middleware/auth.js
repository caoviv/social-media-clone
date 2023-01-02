import { Jwt } from "jsonwebtoken";

// next parameter allows the func to continue
export const verifyToken = async (req, res, next) => {
  try {
    // request from the front-end grabs the authorization header
    let token = req.header("Authorization");

    // if token does not exist
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      // takes everything from the right side of "Bearer "
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    // proceeds to the next step of the func
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
