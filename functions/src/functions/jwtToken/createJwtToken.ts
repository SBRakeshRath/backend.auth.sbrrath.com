import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";

// dotenv.config();

export default function createJwtToken(data: {}) {
  const token = jwt.sign(data,process.env.JWT_TOKEN_PRIVATEKEY as string,{algorithm: "HS256"})

  return token;
}

// const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
