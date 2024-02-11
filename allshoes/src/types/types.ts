import { ObjectId } from "mongodb";

export type UserModel = {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
};

export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type WishlistModel = {
  _id: ObjectId;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type UserModelRegisterInput = Omit<UserModel, "_id">;
export type UserModelLoginInput = Omit<UserModel, "_id">;
export type WishlistModelAddInput = Omit<WishlistModel, "_id">;
