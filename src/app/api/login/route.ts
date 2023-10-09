import { NextResponse } from "next/server";
import getFullUser from "@/helpers/getFullUser";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const credentials = body as ReqBody;

    const user = await getFullUser(credentials);

    if (user == false)
      return NextResponse.json(
        {
          message: "Incorrect credentials",
        },
        { status: 401 }
      );

    return NextResponse.json({
      message: "Login correct",
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};

type ReqBody = {
  email: string;
  password: string;
};
