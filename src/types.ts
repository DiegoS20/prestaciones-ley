import { Decimal } from "@prisma/client/runtime/library";

export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  admissionDate: Date;
  monthlyPayment: string;
  payments: Payment[];
  vacations: Vacation[];
};

export type Payment = {
  id: number;
  userId: number;
  amount: Decimal;
  from: Date;
  to: Date;
  bonuses: Bonus[];
  totalBonus: number;
  vacationsAmount: number;
  aguinaldo: number;
};

export type Vacation = {
  id: number;
  userId: number;
  from: Date;
  to: Date;
};

export type Bonus = {
  id: number;
  userId: number;
  amount: Decimal;
  date: Date;
};

export type FullUserInfo = User & {
  initials: string;
};
