import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import {
  ProductModel,
  WishlistModel,
  WishlistModelAddInput,
} from "@/types/types";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const WISHLIST_COLLECTION = "wishlists";

export const getCollection = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const addWishlist = async (payload: WishlistModelAddInput) => {
  const db = await getCollection();
  const wishlist = await db.collection(WISHLIST_COLLECTION).insertOne({
    ...payload,
    userId: new ObjectId(payload.userId),
    productId: new ObjectId(payload.productId),
  });

  return wishlist;
};

export const getWishlists = async () => {
  const db = await getCollection();
  const agg = [
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "wishlist",
      },
    },
    {
      $unwind: {
        path: "$wishlist",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const wishlists = await db
    .collection(WISHLIST_COLLECTION)
    .aggregate(agg)
    .toArray();

  return wishlists;
};

export const deleteWishlist = async (productId: string) => {
  const db = await getCollection();

  await db.collection(WISHLIST_COLLECTION).deleteOne({
    productId: new ObjectId(productId),
  });
};
