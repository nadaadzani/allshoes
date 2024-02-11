"use server";

import { MyResponse, ProductModel } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleOnClick(product: ProductModel) {
  const response = await fetch("http://localhost:3000/api/wishlists", {
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
