"use server";

import { BASE_API_URL } from "@/db/utils/constants";
import { MyResponse, ProductModel } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleOnClick(product: ProductModel) {
  const response = await fetch(`${BASE_API_URL}/api/wishlists`, {
    method: "POST",
    body: JSON.stringify({
      productId: product._id,
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });

  const responseJson: MyResponse<unknown> = await response.json();

  redirect("/wishlist");

  return responseJson;
}
