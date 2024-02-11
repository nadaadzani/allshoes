import AddWishlistButton from "@/components/AddWishlistButton";
import { rupiah } from "@/db/utils/rupiah";
import { MyResponse, ProductModel } from "@/types/types";

const Page = async ({ params }: { params: { slug: string } }) => {
  const response = await fetch(
    `http://localhost:3000/api/products/${params.slug}`
  );
  const responseJson: MyResponse<ProductModel> = await response.json();
  const slugProduct = responseJson.data as ProductModel;

  return (
    <>
      <summary className="pt-36 min-h-[115vh] w-full bg-gray-300 flex pb-16">
        <div className="flex ml-24 gap-4 w-3/5 h-[36rem]">
          <div className="flex flex-col gap-3">
            {slugProduct.images.map((image, index) => {
              return (
                <img
                  src={image}
                  alt=""
                  className="h-[6.6rem] w-full object-cover"
                  key={index}
                ></img>
              );
            })}
          </div>
          <div className="">
            <img
              src={slugProduct.thumbnail}
              alt=""
              className="h-[36rem] w-[42rem] object-cover"
            />
          </div>
        </div>
        <div className="w-2/5 karla mr-16">
          <p className="text-sm font-light">Home / Products / {params.slug}</p>
          <h3 className="text-left font-[600] tracking-wide text-4xl mt-3">
            {slugProduct.name}
          </h3>
          <p className="mt-2 text-xl">
            {rupiah(slugProduct.price)}
            <span className="italic text-md font-bold ml-6 nunito-sans">
              Free Shipping
            </span>
          </p>

          <p className="font-semibold tracking-wide mt-6">
            Classics:{" "}
            <span className="font-normal tracking-normal text-sm text-gray-800">
              Mist (White Sole)
            </span>
          </p>
          <div className="flex gap-3">
            <div className="w-10 h-10 mt-3 rounded-full bg-gradient-to-r from-slate-300 to-slate-500"></div>
            <div className="w-10 h-10 mt-3 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400"></div>
            <div className="w-10 h-10 mt-3 rounded-full bg-gradient-to-r from-slate-900 to-slate-700"></div>
            <div className="w-10 h-10 mt-3 rounded-full bg-gradient-to-r from-teal-200 to-teal-500"></div>
          </div>

          <p className="font-semibold tracking-wide mt-6">Select size:</p>
          <div className="flex gap-3 mt-2">
            <button className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-all">
              <a href="">6</a>
            </button>
            <button className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-all">
              <a href="">7</a>
            </button>
            <button className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-all">
              <a href="">8</a>
            </button>
            <button className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-all">
              <a href="">9</a>
            </button>
            <button className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-all">
              <a href="">10</a>
            </button>
            <button className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-all">
              <a href="">11</a>
            </button>
            <button className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-all">
              <a href="">12</a>
            </button>
          </div>
          <p className="mt-4 pr-32 text-sm">
            This style is available in whole sizes only. In between sizes? We
            recommend you size up.
          </p>

          <AddWishlistButton product={slugProduct} />
        </div>
      </summary>
    </>
  );
};

export default Page;
