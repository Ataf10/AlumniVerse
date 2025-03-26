import jwt from "jsonwebtoken";

const jwtPrivateKey = process.env.JWT_SECRET;

//Middleware to authorize api requests with a vaild jwt token.
//This checks whether the secret key matches and passes on the request to next method
//A token is valid only till 60 days. Thus we need to make a new API that refreshes the token. That is for some other time.
export const authorization = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }

  try {
    jwt.verify(token, jwtPrivateKey, (err, data) => {
      if (err) {
        return res.status(400).json({ error: "Authorization Failed" });
      }
      req.token = token;
      console.log(`next called`);
      next();
    });
    // ✅ `next()` only runs if verification succeeds
  } catch (err) {
    console.log(`ye error`);
    return res.status(400).json({ error: "Authorization Failed" }); // ✅ Single response
  }
};
