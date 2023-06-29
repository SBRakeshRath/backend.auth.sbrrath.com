import * as jwt from "jsonwebtoken";

export default async function verifyJwtToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_TOKEN_PRIVATEKEY as string);
  } catch (error) {
    throw {error:error,code:"invalid-jwtToken"}
  }
}
