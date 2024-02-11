"use client";

import { handleOnClick } from "@/app/products/action";
import { ProductModel } from "@/types/types";
import { CiHeart } from "react-icons/ci";

export default function AddWishlistButton({
  product,
}: {
  product: ProductModel;
}) {
  return (
    <button
      className="mt-6 w-full flex flex-row justify-center items-center p-2 bg-gray-400 hover:bg-black hover:text-white transition-all"
      onClick={() => handleOnClick(product)}
    >
      <CiHeart size={24} />
      <span>Add to Wishlist</span>
    </button>
  );
}
