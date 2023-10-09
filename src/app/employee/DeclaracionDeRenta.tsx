"use client";

import calcularAguinaldo from "@/helpers/calcularAguinaldo";
import getDeduccionesAnuales from "@/helpers/getDeduccionesAnuales";
import useUser from "@/hooks/useUser";

const USDFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function DeclaracionDeRenta({ year }: Props) {
  const user = useUser((s) => s.user);

  const from = new Date(year, 0, 1);
  const to = new Date(year, 11, 31);
  const { totales } = getDeduccionesAnuales(user!, year);
  const aguinaldo = calcularAguinaldo(
    new Date(user!.admissionDate),
    new Date(year, 11, 31),
    +user!.monthlyPayment
  );
  return (
    <div style={{ position: "relative" }}>
      <h2 style={{ textAlign: "center", marginBottom: "35px" }}>
        Hikaru, S.A de C.V
      </h2>
      <p style={{ marginBottom: "50px" }}>
        El infrascrito agente de retención hace constar que{" "}
        {user?.lastName.toUpperCase()}, {user?.name.toUpperCase()} con NIT.
        0000-000000-000-0 en su calidad de empleada de esta empresa, devengó
        durante el perído comprendido entre el {from.toLocaleDateString()} al{" "}
        {to.toLocaleDateString()}, lo siguiente
      </p>
      <h3 style={{ marginBottom: "25px" }}>DETALLE</h3>
      <table style={{ width: "100%", textAlign: "left" }}>
        <tbody>
          <tr style={{ height: "35px" }}>
            <td style={{ width: "60%" }}>Ingresos devengados</td>
            <td style={{ width: "40%" }}>
              {USDFormat.format(totales.ingresosDevengados)}
            </td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td style={{ width: "60%" }}>Aguinaldo gravado</td>
            <td style={{ width: "40%" }}>-</td>
          </tr>
          <tr style={{ height: "35px" }}>
            <th style={{ width: "60%" }}>Ingresos no gravados</th>
            <td style={{ width: "40%" }}></td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td style={{ width: "60%" }}>Cotización AFP</td>
            <td style={{ width: "40%" }}>{USDFormat.format(totales.afp)}</td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td style={{ width: "60%" }}>Cotización ISSS</td>
            <td style={{ width: "40%" }}>{USDFormat.format(totales.isss)}</td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td style={{ width: "60%" }}>Aguionaldo no gravado</td>
            <td style={{ width: "40%" }}>{USDFormat.format(aguinaldo)}</td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td style={{ width: "60%" }}>Monto gravado</td>
            <td style={{ width: "40%" }}>
              {USDFormat.format(totales.remuneracionesGravadas)}
            </td>
          </tr>
          <tr style={{ height: "35px" }}>
            <td style={{ width: "60%", fontWeight: "bold" }}>
              Impuesto sobre la renta
            </td>
            <td style={{ width: "40%" }}>
              {USDFormat.format(totales.retencionMensual)}
            </td>
          </tr>
        </tbody>
      </table>
      <p
        style={{
          marginTop: "75px",
          fontSize: "0.9rem",
        }}
      >
        Se extiende la presente en la ciudad de Santa Ana el{" "}
        {new Date().toLocaleDateString("es-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

type Props = {
  year: number;
};
