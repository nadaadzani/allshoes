import Link from "next/link";
import { doLogin } from "./action";

const Page = () => {
  return (
    <>
      <div className="bg-[#EEE6E6] w-auto h-screen flex justify-center items-center z-0 pb-12">
        <div className="h-[16rem] w-[30rem] font-bold karla mx-24">
          <h2 className="text-2xl font-[600]">Login</h2>

          <form action={doLogin}>
            <div className="mt-16 flex flex-col gap-4">
              <div>
                <p className="tracking-widest">email</p>
                <input type="text" className="p-2 w-full mt-2" name="email" />
              </div>
              <div>
                <p className="tracking-widest">password</p>
                <input
                  type="password"
                  className="p-2 w-full mt-2"
                  name="password"
                />
              </div>
              <button type="submit" className="h-16 bg-black text-white mt-4">
                Sign in
              </button>
              <p>
                Haven't registered?{" "}
                <Link href={"/register"} className="hover:underline">
                  Sign up.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
