import Footer from "@/components/Footer";
import { BASE_API_URL } from "@/db/utils/constants";
import { MyResponse, ProductModel } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

// PINDAHIN KE COMPONENT DI BAWAH INI:
import { IoIosCloudOutline } from "react-icons/io";

export default async function Home() {
  const response = await fetch(`${BASE_API_URL}/api/products`);
  const responseJson: MyResponse<ProductModel[]> = await response.json();
  const products = responseJson.data?.slice(0, 6);

  if (!BASE_API_URL) {
    return null;
  }

  return (
    <>
      <main className="h-auto flex justify-center">
        <section className="mt-28 w-[90%] h-[32rem] bg-white object-contain relative">
          <img
            src="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1792/cms/6gDTGr0QSUNJt2b84URhBX/4696495d40b0f89759a095969ab254b9/23Q4-WR2-Color-Refresh-Hero-1-Desktop-3840___1439.jpg"
            alt=""
          />
          <div className="absolute top-[30%] left-0 right-0 bg-white w-[12rem] py-8 pr-8">
            <p className="font-semibold tracking-widest text-xl">Featured</p>
            <p className="mt-8 mb-2 tracking-wide font-[500]">
              Men&apos;s shoes
            </p>
            <p className="mb-2 tracking-wide font-[500]">Women&apos;s shoes</p>
            <p className="mb-2 tracking-wide font-[500]">New arrivals</p>
          </div>
          <div className="absolute right-0 bottom-[15%] text-right pr-4">
            <p className="text-5xl font-bold text-white poppins">
              New colors, Next-Gen Comfort
            </p>
            <p className="text-white text-lg mt-4 font-semibold poppins mb-4">
              Maximize your comfiness with the Wool Runner 2, now in new hues.
            </p>

            <button className="px-12 py-4 bg-white poppins font-semibold rounded-md mt-4">
              <a href="">Shop men</a>
            </button>
            <button className="px-12 py-4 bg-white ml-12 poppins font-semibold rounded-md">
              <a href="">Shop women</a>
            </button>
          </div>
        </section>
      </main>

      <section className="mt-12 text-center px-24 mb-12">
        <h3 className="font-bold text-4xl poppins tracking-wide">
          Our Favorites
        </h3>

        <h4 className="text-right mt-8 font-bold text-2xl tracking-wider">
          <Link
            href={"/products"}
            className="hover:decoration-2 hover:underline"
          >
            See all
          </Link>
        </h4>

        <div className="grid grid-cols-3 mt-4 gap-12">
          {products?.map((product, index) => {
            return (
              <div className="shadow-xl h-[25em]" key={index}>
                <img src={product.thumbnail} alt="" className="w-full h-72" />

                <p className="poppins font-[700] text-xl tracking-md text-left ml-8 mt-4">
                  {product.name}
                </p>
                <div className="border-t-2 border-gray-300 mx-8 mt-4"></div>

                <div className="flex ml-8 mt-4 gap-4 items-center poppins font-[500]">
                  <IoIosCloudOutline size={30} />
                  <p>Breezy, Everyday Sneaker</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
