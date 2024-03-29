"use server";

import { BASE_API_URL } from "@/db/utils/constants";
import { ProductModel } from "@/types/types";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type NewWishlistModel = {
  _id: ObjectId;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist: ProductModel;
};

export async function handleDeleteWishlist(wishlist: NewWishlistModel) {
  try {
    const response = await fetch(`${BASE_API_URL}/api/wishlists`, {
      method: "DELETE",
      body: JSON.stringify({
        productId: wishlist.wishlist._id,
      }),
      headers: {
        Cookie: cookies().toString(),
      },
    });
    const responseJson = await response.json();
    console.log(responseJson);
    revalidatePath("/wishlist");
  } catch (error) {
    console.log(error);
  }
}
