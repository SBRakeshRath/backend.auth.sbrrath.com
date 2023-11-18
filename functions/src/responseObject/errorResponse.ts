import { Response } from "express";

type code = "invalid-argument" | "internal-error" | "unauthorized" | "invalid-jwtToken" ;

const defaultResponses: {
  [key in code]: { message: string; statusCode: number };
} = {
  "invalid-argument": {
    message: "Please Provide all the required data",
    statusCode: 400,
  },
  "internal-error": {
    message: "Something Bad Happened!!",
    statusCode: 500,
  },
  "unauthorized": {
    message: "You are not authorized to doo this",
    statusCode: 401,
  },
  "invalid-jwtToken":{
    message: "You are not authorized to doo this",
    statusCode: 401,
  }
};

export default function createServerError(
  res: Response,
  code: code,
  message?: string,
  statusCode?: number
) {
  let errorCode = code;
  let errorMessage = message || "";
  let errorStatusCode = statusCode || 0;

  //set default statusCode

  // console.log("----------------->>>>>>>>>>>>>>>>>")

  // console.log(errorCode)

  if (!statusCode) {
    errorStatusCode = defaultResponses[errorCode].statusCode;
  }
  if (!message || message.trim() === "") {
    errorMessage = defaultResponses[errorCode].message;
  }

  res.status(errorStatusCode).json({
    "error-type": "server-error",
    "error-code": errorCode,
    message: errorMessage,
    status: errorStatusCode,
  });

  return;
}
