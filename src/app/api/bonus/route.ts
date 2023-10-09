import { NextResponse } from "next/server";
import prisma from "../prisma";

export const POST = async (req: Request) => {
  try {
    const data = (await req.json()) as Body;

    const bonus = await prisma.bonus.create({
      data,
    });

    return NextResponse.json(
      {
        message: "Bonus created successfully",
        bonus,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};

type Body = {
  userId: number;
  amount: number;
  date: Date;
};
