import { getProducts, getProductsByNameSearch } from "@/db/models/product";
import { MyResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export const dynamic = "force-dynamic";

const productModelSchema = z.object({
  name: z.string(),
  slug: z.string(), // Must be unique

  description: z.string().optional(),
  excerpt: z.string().optional(),
  price: z.number().optional(),
  tags: z.string().array().optional(),
  thumbnail: z.string().optional(),
  images: z.string().array().optional(),
  // Ambiguous for this one, ask ko Wendy
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("name");
    const offset = Number(searchParams.get("offset"));

    const products = await getProductsByNameSearch(search || "", offset);

    products.forEach((el) => {
      const validProduct = productModelSchema.safeParse(el);

      if (!validProduct.success) {
        throw validProduct.error;
      }
    });

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "GET /api/products was a success!",
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
    }
    console.log(error);
  }
};
