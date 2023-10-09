import { FullUserInfo } from "@/types";
import getISSS from "./getISSS";
import getAFP from "./getAFP";
import calculateRent from "./calculateRent";

export default function getDeduccionesAnuales(
  user: FullUserInfo,
  year: number
) {
  const payments = user.payments.filter(
    (p) => new Date(p.from).getFullYear() == year
  );

  const deducciones: {
    deducciones: Deducciones[];
    totales: Deducciones;
  } = {
    deducciones: [],
    totales: {
      mes: "TOTAL",
      remuneracionesGravadas: 0,
      retencionMensual: 0,
      afp: 0,
      isss: 0,
      ingresosDevengados: 0,
    },
  };

  for (const payment of payments) {
    const mes = new Date(payment.from)
      .toLocaleDateString("es-EN", {
        month: "long",
      })
      .toUpperCase();
    const grosserySalary =
      +payment.amount + payment.totalBonus + payment.vacationsAmount;
    const isss = getISSS(grosserySalary);
    const afp = getAFP(grosserySalary);
    const rent = calculateRent(grosserySalary);
    const remuneracionesGravadas = grosserySalary - isss - afp;
    const ingresosDevengados = grosserySalary + payment.aguinaldo;

    deducciones.deducciones.push({
      mes,
      remuneracionesGravadas,
      retencionMensual: rent,
      afp,
      isss,
      ingresosDevengados,
    });
    deducciones.totales.remuneracionesGravadas += remuneracionesGravadas;
    deducciones.totales.retencionMensual += rent;
    deducciones.totales.afp += afp;
    deducciones.totales.isss += isss;
    deducciones.totales.ingresosDevengados += ingresosDevengados;
  }

  return deducciones;
}

type Deducciones = {
  mes: string;
  remuneracionesGravadas: number;
  retencionMensual: number;
  afp: number;
  isss: number;
  ingresosDevengados: number;
};
