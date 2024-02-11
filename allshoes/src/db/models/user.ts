import { Db } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashPass } from "../utils/hash";
import { UserModel, UserModelRegisterInput } from "@/types/types";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const USER_COLLECTION = "users";

export const getCollection = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const registerUser = async (user: UserModelRegisterInput) => {
  const db = await getCollection();
  const newUser: UserModelRegisterInput = {
    ...user,
    name: user.username,
    password: hashPass(user.password),
  };
  const result = db.collection(USER_COLLECTION).insertOne(newUser);
  return result;
};

export const getUserByEmail = async (email: string) => {
  const db = await getCollection();

  const user = (await db
    .collection(USER_COLLECTION)
    .findOne({ email: email })) as UserModel;
  return user;
};
