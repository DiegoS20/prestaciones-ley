import { NextResponse } from "next/server";
import prisma from "../prisma";
import countWorkDay from "@/helpers/countWorkDays";

export const POST = async (req: Request) => {
  try {
    const data = (await req.json()) as Body;

    const { userId } = data;
    const vacations = await prisma.vacations.findMany({
      where: {
        userId,
      },
    });
    const vacationsAlreadyTaken = vacations.some(
      (v) => v.from.getFullYear() == new Date(data.from).getFullYear()
    );
    if (vacationsAlreadyTaken)
      return NextResponse.json(
        {
          message: "Las vacaciones ya fueron tomadas en el año solicitado",
        },
        { status: 409 }
      );

    const vacationDays = countWorkDay(data.from, data.to);
    if (vacationDays > 15)
      return NextResponse.json(
        {
          message: "Las vacaciones no deben superar los 15 días",
        },
        { status: 409 }
      );

    const vacation = await prisma.vacations.create({
      data,
    });

    return NextResponse.json(
      {
        message: "Vacation added successfully",
        vacation,
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
  from: Date;
  to: Date;
};
