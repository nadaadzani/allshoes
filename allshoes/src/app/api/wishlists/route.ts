import {
  addWishlist,
  deleteWishlist,
  getWishlists,
} from "@/db/models/wishlist";
import { MyResponse, WishlistModel } from "@/types/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import Swal from "sweetalert2";
import { z } from "zod";

const wishlistModelSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    data.userId = request.headers.get("x-user-id");

    const foundData = await getWishlists();
    foundData.forEach((el) => {
      if (el.productId == data.productId) {
        throw new Error("Already added as a wishlist!");
      }
    });

    const parsedData = wishlistModelSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const wishlist = await addWishlist({
      userId: parsedData.data.userId,
      productId: parsedData.data.productId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "POST /api/wishlist was a success!",
        data: wishlist,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);

      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }
    console.log(error);
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 400,
        error: `Already added as a wishlist!`,
      },
      {
        status: 400,
      }
    );
  }
};

export const GET = async () => {
  try {
    const data = await getWishlists();

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "GET /api/wishlist was a success!",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);

      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }
    console.log(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const productId: string = data.productId;
    await deleteWishlist(productId);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "DELETE /api/wishlists was a success!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
