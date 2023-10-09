import getFullUser from "@/helpers/getFullUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (_: Request, { params }: Params) => {
  try {
    const id = +params.id;

    const user = await getFullUser({ id });

    if (user == false)
      return NextResponse.json(
        {
          message: "User does not exist",
        },
        { status: 404 }
      );

    return NextResponse.json({
      message: "User was found",
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

type Params = {
  params: {
    id: string;
  };
};
