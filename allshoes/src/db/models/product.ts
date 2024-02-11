import { Db } from "mongodb";
import { getMongoClientInstance } from "../config";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const PRODUCTS_COLLECTION = "products";

export const getCollection = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const getProducts = async () => {
  const db = await getCollection();
  const products = await db.collection(PRODUCTS_COLLECTION).find().toArray();

  return products;
};

export const getProductsByNameSearch = async (
  payload: string,
  offset: number
) => {
  const db = await getCollection();
  let products;

  if (!payload || payload === "") {
    products = await db
      .collection(PRODUCTS_COLLECTION)
      .find({})
      .limit(10)
      .skip(offset)
      .toArray();
    return products;
  }

  products = await db
    .collection(PRODUCTS_COLLECTION)
    .find({
      name: { $regex: payload, $options: "i" },
    })
    .toArray();

  return products;
};

export const getProductBySlugName = async (payload: string) => {
  const db = await getCollection();

  const product = await db.collection(PRODUCTS_COLLECTION).findOne({
    slug: payload,
  });

  return product;
};
