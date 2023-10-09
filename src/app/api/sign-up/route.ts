import { User } from "@/types";
import { NextResponse } from "next/server";
import prisma from "../prisma";
import countWorkDay from "@/helpers/countWorkDays";
import monthBetweenDates from "@/helpers/monthBetweenDates";
import getWorkDaysAtMonth from "@/helpers/getWorkDaysAtMonth";

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const userInfo = body as User;

    // Month difference calculation
    const admissionDate = new Date(userInfo.admissionDate);
    const today = new Date();

    const payments: Payment[] = [];
    for (let i = 0; i < monthBetweenDates(admissionDate, today); i++) {
      const month = admissionDate.getMonth() + i;
      const year = admissionDate.getFullYear();
      const day = i == 0 ? admissionDate.getDate() : 1;
      const startDate = new Date(year, month, day);
      const endDate = new Date(year, month + 1, 0);

      const workDaysAtMonth = getWorkDaysAtMonth(month, year);
      const dayPrice = +userInfo.monthlyPayment / workDaysAtMonth;
      const daysWorked = countWorkDay(startDate, endDate);

      const amount = +(dayPrice * daysWorked).toFixed(2);

      payments.push({
        amount,
        from: startDate,
        to: endDate,
      });
    }

    userInfo.admissionDate = admissionDate;
    await prisma.user.create({
      data: {
        ...userInfo,
        Payments: {
          create: payments,
        },
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
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

type Payment = {
  amount: number;
  from: Date;
  to: Date;
};
