import prisma from "@/app/api/prisma";
import { Payment } from "@/types";
import countWorkDay from "./countWorkDays";
import getWorkDaysAtMonth from "./getWorkDaysAtMonth";
import calcularAguinaldo from "./calcularAguinaldo";

export default async function getFullUser(searchBy: SearchBy) {
  const _user = await prisma.user.findFirst({
    where: searchBy,
    include: {
      Payments: {
        orderBy: {
          id: "desc",
        },
      },
    },
  });

  if (_user == null) return false;

  const userId = _user.id;

  const { Payments, ...userInfo } = _user;
  const payments: Payment[] = [];

  const vacations = await prisma.vacations.findMany({
    where: {
      userId,
    },
  });

  for (let i = 0; i < Payments.length; i++) {
    const payment = Payments[i];

    const where = {
      userId,
      date: {
        gte: payment.from,
        lte: payment.to,
      },
    };
    const bonuses = await prisma.bonus.findMany({
      where,
    });
    const sumBonus = await prisma.bonus.aggregate({
      where,
      _sum: {
        amount: true,
      },
    });

    const paymentFrom = payment.from.setHours(0, 0, 0);
    const paymentTo = payment.to.setHours(23, 59, 59);
    let vacationsAmount = 0;
    const _vacations = vacations.filter((v) => {
      const fromTime = v.from.setHours(0, 0, 0);
      return fromTime <= paymentTo && fromTime >= paymentFrom;
    });
    if (_vacations.length) {
      const from = _vacations[0].from;
      const to = _vacations[0].to;
      const vacationDays = countWorkDay(from, to);
      const workDaysAtMonth = getWorkDaysAtMonth(
        from.getMonth(),
        from.getFullYear()
      );
      const priceDays = +_user.monthlyPayment / workDaysAtMonth;
      vacationsAmount = vacationDays * priceDays * 0.3;
    }

    let aguinaldo = 0;
    if (payment.to.getMonth() == 11) {
      aguinaldo = calcularAguinaldo(
        _user.admissionDate,
        payment.to,
        +_user.monthlyPayment
      );
    }

    payments.push({
      ...payment,
      bonuses,
      totalBonus: +(sumBonus._sum.amount ?? 0),
      vacationsAmount,
      aguinaldo,
    });
  }

  const user = {
    ...userInfo,
    payments,
  };

  // Creating name initials
  const nameSplited = user.name.split(" ");
  const lastNameSplited = user.lastName.split(" ");
  const firstNameLetter = nameSplited[0].charAt(0).toUpperCase();
  const firstLastNameLetter = lastNameSplited[0].charAt(0).toUpperCase();
  const initials = firstNameLetter + firstLastNameLetter;

  return {
    ...user,
    initials,
    vacations,
  };
}

type SearchBy = {
  id?: number;
  email?: string;
  password?: string;
};
