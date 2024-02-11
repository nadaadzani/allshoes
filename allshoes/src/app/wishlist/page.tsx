import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductModel, WishlistModel } from "@/types/types";
import { cookies } from "next/headers";
import Wishlist from "@/components/Wishlist";
import { ObjectId } from "mongodb";
import { BASE_API_URL } from "@/db/utils/constants";

type NewWishlistModel = {
  _id: ObjectId;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist: ProductModel;
};

const Page = async () => {
  const response = await fetch(`${BASE_API_URL}/api/wishlists`, {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const responseJson = await response.json();
  const wishlists: NewWishlistModel[] = responseJson.data;
  // console.log(responseJson.data);
  if (!BASE_API_URL) {
    return null;
  }

  return (
    <>
      <main className="w-full h-auto pt-24">
        <h1 className="mx-8 text-center text-4xl font-bold karla">
          My wishlist
        </h1>
        <div className="grid grid-cols-4 mx-12 gap-4 mt-8 mb-8">
          {wishlists?.map((wishlist, index) => {
            return <Wishlist wishlist={wishlist} key={index} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Page;
