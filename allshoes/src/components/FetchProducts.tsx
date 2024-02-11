"use server";

import { ProductModel } from "@/types/types";

export async function fetchProducts() {
  const response = await fetch("http://localhost:3000/api/products", {
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
