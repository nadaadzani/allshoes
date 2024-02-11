"use server";

import { getUserByEmail } from "@/db/models/user";
import { comparePass } from "@/db/utils/hash";
import { signToken } from "@/db/utils/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const doLogin = async (formData: FormData) => {
  const userLoginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = userLoginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    // !! Ingat, jangan di-throw kecuali ingin menghandle error di sisi client via error.tsx !
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    // Mengembalikan error via redirect
    return redirect(`http://localhost:3000/login?error=${errFinalMessage}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !comparePass(parsedData.data.password, user.password)) {
    return redirect(`http://localhost:3000/login?error=Invalid%20credentials`);
  }

  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = signToken(payload);

  cookies().set("token", token, {
    httpOnly: true,
    // Meng-set cookie agar hanya bisa diakses melalui HTTPS, karena ini hanya untuk development, maka kita akan set false
    secure: false,
    // Meng-set expiration time dari cookies
    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    // Meng-set cookie agar hanya bisa diakses melalui domain yang sama
    sameSite: "strict",
  });

  return redirect("/");
};
