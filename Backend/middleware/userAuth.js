import jwt from "jsonwebtoken"

const userCheck = (req, res, next) => {
  const authHeader = req.headers["authorization"];  // always lowercase
  if (!authHeader) {
    return res.json({ success: false, message: "User needs to login to access this feature 00" });
  }

  const token = authHeader.split(" ")[1]; // get token after "Bearer"
  if (!token) {
  return res.json({ success: false, message: "User needs to login to access this feature io " });
}
  try {
    const verify = jwt.verify(token, process.env.JWT_KEY);
    req.userId = verify.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.json({ success: false, message: "Login again" });
    }
    return res.json({ success: false, message: error.message });
  }
};



export default userCheck