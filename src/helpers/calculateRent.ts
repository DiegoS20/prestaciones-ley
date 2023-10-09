import getAFP from "./getAFP";
import getISSS from "./getISSS";

export default function calculateRent(grossSalary: number) {
  const isss = getISSS(grossSalary);
  const afp = getAFP(grossSalary);
  const salaryRentFree = grossSalary - isss - afp;
  const rangos = [
    { desde: 472.01, hasta: 895.24, porcentaje: 0.1, cuotaFija: 17.67 },
    { desde: 895.25, hasta: 2038.1, porcentaje: 0.2, cuotaFija: 60 },
    { desde: 2038.11, hasta: Infinity, porcentaje: 0.3, cuotaFija: 288.57 },
  ];
  const rango = rangos.find(
    (r) => salaryRentFree >= r.desde && salaryRentFree <= r.hasta
  );

  if (!rango) return 0;

  const excedente = salaryRentFree - rango.desde;
  const renta = excedente * rango.porcentaje + rango.cuotaFija;
  return +renta.toFixed(2);
}
