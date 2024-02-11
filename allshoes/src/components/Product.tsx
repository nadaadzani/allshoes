import Link from "next/link";

import { FaHeart } from "react-icons/fa";
import { ProductModel } from "@/types/types";
import { rupiah } from "@/db/utils/rupiah";
// import ServerProtectedComponents from "./ServerProtectedComponent";
import AddWishlistButton from "./AddWishlistButton";

const Product = ({ product }: { product: ProductModel }) => {
  return (
    <>
      <div className="h-full relative shadow-xl transition ease-in-out delay-50 hover:scale-105">
        <div className="absolute right-1 top-1 w-10 h-10 rounded-md flex justify-center items-center text-white hover:transition-all hover:text-red-500">
          <FaHeart size={28} />
        </div>
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.thumbnail}
            alt=""
            className="h-[18rem] w-full object-cover"
          />
        </Link>
        <p className="text-lg font-semibold text-gray-800 karla mt-4">
          {product.name}
        </p>
        <p className="text-gray-700">{rupiah(product.price)}</p>
        {/* <ServerProtectedComponents> */}
        <AddWishlistButton product={product} />
        {/* </ServerProtectedComponents> */}
      </div>
    </>
  );
};

export default Product;
