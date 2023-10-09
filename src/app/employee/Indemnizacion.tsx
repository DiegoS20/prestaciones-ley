"use client";

import useUser from "@/hooks/useUser";

const USDFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function Indenmizacion() {
  const user = useUser((s) => s.user!);

  const now = new Date();
  const admissionDate = new Date(user.admissionDate);
  let years = now.getFullYear() - admissionDate.getFullYear();
  const monthsDifference = now.getMonth() - admissionDate.getMonth();
  const isPastMonth = monthsDifference < 0;
  const isPastDay =
    monthsDifference == 0 && now.getDate() < admissionDate.getDate();
  if (isPastMonth || isPastDay) years--;
  const yearsCost = years * +user.monthlyPayment;
  const monthPayment = (30 * monthsDifference) / 365;
  const total = yearsCost + monthPayment;

  const fullName = `${user.name} ${user.lastName}`;
  const today = new Date().toLocaleDateString("es-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "3rem",
        }}
      >
        Santa Ana, {today} <br />
        <br />
        Sr./Sra. {fullName}
      </div>
      <div
        style={{
          marginBottom: "35px",
        }}
      >
        Por medio de la presente le comunicamos que la empresa Hikaru S.A de C.V
        ha decidido proceder a su despido con efectos del día {today} <br />
        <br />
        La indemnización que le corresponde, calculada por {years} año(s) y{" "}
        {monthsDifference} mes(es) trabajados, asciende a{" "}
        {USDFormat.format(total)} brutos, a la cual se le aplicarán las
        retenciones que procedan. <br />
        <br />
        El importe total de la indemnización se le ingresará, junto con el
        importe de la liquidación de haberes devengados según desglose de
        nómina, mediante transferencia bancaria en la cuenta en la que viene
        percibiendo su salario.
      </div>
      <div>
        Atentamente, <br />
        <span style={{ fontWeight: "bold" }}>Hikaru S.A de C.V</span>
      </div>
    </div>
  );
}
