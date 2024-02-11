"use server";

import { BASE_API_URL } from "@/db/utils/constants";
import { ProductModel } from "@/types/types";

export async function fetchProducts() {
  const response = await fetch(`${BASE_API_URL}/api/products`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  const data: ProductModel[] = responseJson.data;
  return data;
}
