import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose } from "./db/utils/token";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    console.log(request.method, request.url);
  }

  if (request.url.includes("/api/wishlist")) {
    console.log("API", request.method, request.url);
    const token = cookies().get("token");
    console.log("token dari cookieStore", token);

    if (!token) {
      // Karena asumsi ini adalah DARI /api (route handler), maka kita akan menggunakan NextResponse.json()
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    // const tokenData = verifyToken(token.value) as {
    //   id: string;
    //   email: string;
    //   name: string;
    // };

    const tokenData = await readPayloadJose<{
      id: string;
      email: string;
      name: string;
    }>(token.value);

    const requestHeaders = new Headers(request.headers);

    // Di sini kita akan menambahkan data user ke dalam headers
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);
    requestHeaders.set("x-user-name", tokenData.name);

    // Di sini kita akan mengembalikan response dengan headers yang sudah kita tambahkan
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  // Jangan lupa untuk meng-"sliding" supaya request bisa dilanjutkan ke handler berikutnya dengan menggunakan "next()"
  return NextResponse.next();
};
