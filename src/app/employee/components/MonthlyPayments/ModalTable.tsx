import { Table, TableBody, TableCell, TableRow } from "@mui/material";

import calculateRent from "@/helpers/calculateRent";
import capitalize from "@/helpers/capitalize";
import getAFP from "@/helpers/getAFP";
import getISSS from "@/helpers/getISSS";
import { Payment } from "@/types";

import styles from "./styles.module.scss";

const USDFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function ModalTable({ payment, position }: Props) {
  const grosserySalary =
    +payment.amount + payment.totalBonus + payment.vacationsAmount;
  const isss = getISSS(grosserySalary);
  const afp = getAFP(grosserySalary);
  const renta = calculateRent(grosserySalary);
  const discounts = isss + afp + renta;
  const liquidSalary = grosserySalary - discounts + payment.aguinaldo;

  const ingresos = {
    salario: +payment.amount,
    vacaciones: payment.vacationsAmount,
    bonos: payment.totalBonus,
    aguinaldo: payment.aguinaldo,
  };
  const prestaciones = {
    isss,
    afp,
    renta,
  };
  const ingresosEntries = Object.entries(ingresos);
  const prestacionesEntries = Object.entries(prestaciones);
  return (
    <div className={styles["modal-table"]}>
      <div className={styles.incomings}>
        <h2>Ingresos</h2>
        <div className={styles["incomings-table"]}>
          <Table sx={{ width: "100%" }}>
            <TableBody>
              {ingresosEntries.map((ie, i) => (
                <TableRow key={i}>
                  <TableCell variant="head" style={{ fontWeight: "bold" }}>
                    {capitalize(ie[0])}
                  </TableCell>
                  <TableCell>{USDFormat.format(ie[1])}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className={styles["info-boleta"]}>
          <div className={styles["info-facturacion"]}>
            <span>San Salvador</span>
            <span style={{ marginTop: "25px", display: "block" }}>
              {capitalize(
                new Date(payment.to).toLocaleDateString("es-US", {
                  weekday: "long",
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })
              )}
            </span>
          </div>
          <div className={styles["empresa"]}>
            Hikaru S.A de C.V - {position}
          </div>
        </div>
      </div>
      <div className={styles.prestaciones}>
        <div className={styles["prestaciones-table"]}>
          <h2>Prestaciones</h2>
          <Table sx={{ width: "100%" }}>
            <TableBody>
              {prestacionesEntries.map((pe, i) => (
                <TableRow key={i}>
                  <TableCell variant="head" style={{ fontWeight: "bold" }}>
                    {capitalize(pe[0])}
                  </TableCell>
                  <TableCell>{USDFormat.format(pe[1])}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table sx={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell variant="head" style={{ fontWeight: "bold" }}>
                  Total descuentos:
                </TableCell>
                <TableCell>{USDFormat.format(discounts)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" style={{ fontWeight: "bold" }}>
                  Paga recibida:
                </TableCell>
                <TableCell>{USDFormat.format(liquidSalary)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

type Props = {
  payment: Payment;
  position: string;
};
