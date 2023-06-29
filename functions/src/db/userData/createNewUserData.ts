import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

export default async function createNewUserData(
  email: string,
  password: string
) {
  const db = getFirestore();

  async function generateUuid(id: string):Promise<string | boolean> {
    try {
      //   const snapshot = await db.collection("userData").where("uid", "==", id);
      const snapshot = await db
        .collection("userData")
        .where("uid", "==", id)
        .get();
      if (snapshot.empty) {
        return id;
      }
      return generateUuid((id = randomUUID()));
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const uuid = await generateUuid(randomUUID());

  if (!uuid)
    throw {
      type: "db-error",
      success: false,
      reason: "uuid can not generate",
      clientReason: "internal-error",
    };

  //check email

  try {
    const snapshot = await db
      .collection("userData")
      .where("authDetails.email", "==", email)
      .get();
    if (!snapshot.empty) {
      throw {
        type: "db-error",
        success: false,
        reason: "email-present",
        clientReason: "email is already present",
      };
    }
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      error["type"] === "db-error"
    ) {
      throw error;
    }

    throw {
      type: "db-error",
      success: false,
      reason: "error in db reading",
      clientReason: "internal-error",
    };
  }

  const newUserData = {
    uid: uuid,
    isIdActive: false,
    deActiveReason: "inCompleteData",
    userCreated: FieldValue.serverTimestamp(),
    maserChange: FieldValue.serverTimestamp(),
    authDetails: {
      provider: "email",
      email: email,
      password: bcrypt.hashSync(password, 10),
    },
    loginDetails: {},
    personalData: {
      name: "",
      dob: "",
      profilePic: "",
    },
    contactDetails: {
      emails: [],
      numbers: [],
    },
  };

  try {
    await db.collection("userData").doc().set(newUserData);
  } catch (error) {
    console.log(error);
    throw {
      type: "db-error",
      success: false,
      reason: "error in db writing",
      clientReason: "internal-error",
    };
  }
}
