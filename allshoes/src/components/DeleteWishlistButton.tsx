"use client";

import { handleDeleteWishlist } from "@/app/wishlist/action";
import { ProductModel } from "@/types/types";
import { ObjectId } from "mongodb";

type NewWishlistModel = {
  _id: ObjectId;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist: ProductModel;
};

export default function DeleteWishlistButton({
  wishlist,
}: {
  wishlist: NewWishlistModel;
}) {
  return (
    <>
      <button
        className="mt-6 w-full flex flex-row justify-center items-center p-2 bg-gray-400"
        onClick={() => handleDeleteWishlist(wishlist)}
      >
        Delete Wishlist
      </button>
    </>
  );
}
