import { CiSearch } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { GrLogout } from "react-icons/gr";
import { SlLogout } from "react-icons/sl";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Navbar() {
  return (
    <>
      <nav className="fixed h-16 bg-white shadow-xl flex items-center z-10 w-full justify-between">
        <div className="flex gap-8 ml-8 mr-12 font-semibold tracking-widest">
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
          <p>Socks</p>
          <p>Sale</p>
        </div>
        <div className="mx-auto">
          <Link href={"/"}>
            <h1 className="logo text-4xl">allshoes</h1>
          </Link>
        </div>
        <div className="ml-auto mr-12 flex gap-8">
          <CiSearch size={36} />
          {cookies().get("token") ? (
            <>
              <form
                action={async () => {
                  "use server";

                  cookies().get("token") && cookies().delete("token");

                  redirect("/login");
                }}
              >
                <button type="submit">
                  <SlLogout size={36} />
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <BsPerson size={36} />
              </Link>
            </>
          )}
          <Link href={"/wishlist"}>
            <CiShoppingTag size={36} />
          </Link>
        </div>
      </nav>
    </>
  );
}
