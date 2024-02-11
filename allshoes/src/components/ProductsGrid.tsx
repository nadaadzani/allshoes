"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import Product from "./Product";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { MyResponse } from "@/types/types";

type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

const ProductsGrid = ({ search }: { search: string }) => {
  const [loading, setLoading] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState<ProductModel[]>([]);
  const [totalData, setTotalData] = useState(40);
  const [currentData, setCurrentData] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const [inititalSearchComplete, setInitialSearchComplete] = useState(false);

  // console.log(totalData);

  async function handleSearchChange() {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/products?name=${search}`
      );
      const responseJson: MyResponse<ProductModel[]> = await response.json();
      setSearchedProducts(responseJson.data as ProductModel[]);
      setInitialSearchComplete(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }

  async function fetchMoreData(offset: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products?name=${search}&offset=${offset}`
      );
      const responseJson: MyResponse<ProductModel[]> = await response.json();
      const nextData = responseJson.data;

      const newData = searchedProducts.concat(nextData as ProductModel[]);

      setSearchedProducts((prevSearchedProducts) =>
        prevSearchedProducts.concat(nextData as ProductModel[])
      );
      setCurrentData(currentData + 8);

      if (newData.length >= totalData) {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleSearchChange();
    }, 500);
  }, [search]);

  if (loading) {
    return (
      <>
        <h1 className="mt-8 text-center">Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div id="scrollDiv" className="h-[115vh] overflow-auto">
        <InfiniteScroll
          dataLength={searchedProducts.length}
          next={() => fetchMoreData(searchedProducts.length)}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading...</h4>}
          scrollableTarget="scrollDiv"
        >
          <div className="grid grid-cols-4 mx-12 gap-4 mt-8 mb-8">
            {searchedProducts?.map((product, index) => {
              return <Product product={product} key={index} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ProductsGrid;
