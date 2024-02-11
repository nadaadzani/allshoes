import { registerUser } from "@/db/models/user";
import { MyResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userModelSchema = z.object({
  name: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const parsedData = userModelSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await registerUser(parsedData.data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "POST /api/users was a success!",
        data: user,
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
  }
};
