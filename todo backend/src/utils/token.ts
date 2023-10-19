import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const getAccessToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign(
    { _id },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: "30s",
    }
  );
  return authenticatedUserToken;
};

export const getRefreshToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign(
    { _id },
    process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return authenticatedUserToken;
};
