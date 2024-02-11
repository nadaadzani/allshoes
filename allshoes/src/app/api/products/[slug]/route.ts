import { getProductBySlugName } from "@/db/models/product";
import { MyResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const productModelSchema = z.object({
  name: z.string(), // required
  slug: z.string(), // required, must be unique

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

export const GET = async (
  _request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    const slug = params.slug;

    const product = await getProductBySlugName(slug);

    const validProduct = productModelSchema.safeParse(product);

    if (!validProduct.success) {
      throw validProduct.error;
    }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "GET /api/products/:slug was a success!",
        data: product,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
    }
  }
};
