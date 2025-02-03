import jwt from "jsonwebtoken";

console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN); // Debugging

export const jwtSign = (signData) => {
  return jwt.sign(signData, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Provide a default value
  });
};

export const jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
