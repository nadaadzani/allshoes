"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductsGrid from "@/components/ProductsGrid";
import { ProductModel, MyResponse } from "@/types/types";

import { CiSearch } from "react-icons/ci";

const Page = () => {
  const [search, setSearch] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [searchedProducts, setSearchedProducts] = useState<ProductModel[]>([]);
  // const [totalData, setTotalData] = useState(0);
  // const [currentData, setCurrentData] = useState(16);
  // const [hasMore, setHasMore] = useState(true);

  // // console.log(searchedProducts);
  // async function handleSearchChange() {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       `http://localhost:3000/api/products?name=${search}`
  //     );
  //     const responseJson: MyResponse<ProductModel[]> = await response.json();
  //     setSearchedProducts((responseJson.data as ProductModel[]).slice(0, 8));
  //     setTotalData((responseJson.data as ProductModel[]).length);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }
  // }

  // async function fetchMoreData(length: number) {
  //   try {
  //     const offset: number = Math.floor(length / 8);
  //     const nextPage = offset * 8;
  //     const response = await fetch(
  //       `http://localhost:3000/api/products?name=${search}`
  //     );
  //     const responseJson: MyResponse<ProductModel[]> = await response.json();
  //     // console.log(nextPage, "<<< offset * 8", length, "<<< current length");
  //     const nextData = responseJson.data?.slice()
  //     console.log(searchedProducts, "concat", nextData);
  //     const newData = searchedProducts.concat(nextData as ProductModel[]);
  //     setSearchedProducts(newData as ProductModel[]);
  //     setCurrentData(nextPage + 8);
  //     console.log(currentData, "<<< works");
  //     if (nextPage >= totalData) {
  //       setHasMore(false); // No more data to load
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleSearchChange();
  //   }, 500);
  //   setTimeout(() => {
  //     fetchMoreData(currentData);
  //   }, 3000);
  //   // setTimeout(() => {
  //   //   fetchMoreData(currentData);
  //   // }, 6000);
  // }, [search, hasMore]);

  return (
    <>
      <main className="w-full min-h-screen pt-24 overflow-auto">
        <h1 className="mx-8 text-center text-4xl font-bold karla">
          Our products
        </h1>

        <div className="flex justify-center mt-4">
          <form action="">
            <div className="relative flex">
              <button type="submit" className="absolute top-0 bottom-0 left-1">
                <CiSearch size={24} />
              </button>
              <input
                type="text"
                name="search"
                placeholder="Search your product.."
                className="bg-gray-100 rounded-md pl-10 p-1 w-[28rem]"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link
                href={"/"}
                className="flex text-gray-500 text-sm items-center ml-2"
              >
                cancel
              </Link>
            </div>
          </form>
        </div>

        <ProductsGrid search={search} />
      </main>
    </>
  );
};

export default Page;
