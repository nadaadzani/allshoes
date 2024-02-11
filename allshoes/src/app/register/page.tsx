import { BASE_API_URL } from "@/db/utils/constants";
import { redirect } from "next/navigation";

const Page = () => {
  const handleFormAction = async (formData: FormData) => {
    "use server";

    type MyResponse<T> = {
      statusCode: number;
      message?: string;
      data?: T;
      error?: string;
    };

    const response = await fetch(`${BASE_API_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson: MyResponse<unknown> = await response.json();
    if (!response.ok) {
      let message = responseJson.error ?? "Something went wrong..";
      return redirect(`/register?error=${message}`);
    }
    return redirect("/login");
  };

  if (!BASE_API_URL) {
    return null;
  }

  return (
    <>
      <div className="bg-[#EEE6E6] w-auto h-screen flex justify-center items-center z-0 pb-48">
        <div className="h-[16rem] w-[30rem] font-bold karla mx-12">
          <h2 className="text-2xl font-[600]">Create an account</h2>

          <p className="mt-4 font-normal">
            We never save credit card information. Registering makes checkout
            fast and easy and saves your order information in your account.
          </p>

          {/* this will be turned into a Client Component */}
          <form action={handleFormAction}>
            <div className="flex flex-col mt-6 tracking-widest gap-2">
              <label htmlFor="">username *</label>
              <input
                type="text"
                name="username"
                id="username"
                className="p-2"
              />

              <label htmlFor="">email *</label>
              <input type="text" name="email" id="email" className="p-2" />

              <label htmlFor="">password *</label>
              <input
                type="password"
                name="password"
                id="password"
                className="p-2"
              />

              <button type="submit" className="bg-black text-white h-16 mt-4">
                Register
              </button>
            </div>
          </form>
          <p className="text-sm font-normal text-center mt-4">
            By creating an account, you agree to our Terms of Use and Privacy
            Policy.
          </p>
          <p className="text-sm font-normal text-center text-red-500 mt-4">
            * Required Fields
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
