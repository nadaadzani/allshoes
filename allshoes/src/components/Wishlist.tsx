"use client";

import { rupiah } from "@/db/utils/rupiah";
import { ProductModel, WishlistModel } from "@/types/types";
import { ObjectId } from "mongodb";
import { FaHeart } from "react-icons/fa";
import DeleteWishlistButton from "./DeleteWishlistButton";

type NewWishlistModel = {
  _id: ObjectId;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist: ProductModel;
};

export default function Wishlist({ wishlist }: { wishlist: NewWishlistModel }) {
  //   console.log(wishlist);

  return (
    <>
      <div className="h-full relative shadow-xl transition ease-in-out delay-50 hover:scale-105">
        <div className="absolute right-1 top-1 w-10 h-10 rounded-md flex justify-center items-center text-white hover:transition-all hover:text-red-500">
          <FaHeart size={28} />
        </div>
        <img
          src={wishlist.wishlist.thumbnail}
          alt=""
          className="h-[18rem] w-full object-cover"
        />
        <p className="text-lg font-semibold text-gray-800 karla mt-4">
          {wishlist.wishlist.name}
        </p>
        <p className="text-gray-700">{rupiah(wishlist.wishlist.price)}</p>
        <DeleteWishlistButton wishlist={wishlist} />
      </div>
    </>
  );
}
