"use client";

import { useState } from "react";
import {
  Paper,
  Table,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  Modal,
} from "@mui/material";
import moment from "moment";

import calculateRent from "@/helpers/calculateRent";
import getAFP from "@/helpers/getAFP";
import getISSS from "@/helpers/getISSS";
import useUser from "@/hooks/useUser";
import { Payment } from "@/types";
import ModalTable from "./ModalTable";

const USDFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function MonthlyPayments() {
  const [selectedSalary, setSelectedSalary] = useState<Payment | null>(null);
  const [payments, position] = useUser(({ user }) => [
    user!.payments,
    user!.position,
  ]);

  const dateWithoutTimezone = (date: Date) => {
    const _date = new Date(date);
    const tzoffset = _date.getTimezoneOffset() * 1000;
    const withoutTimezone = new Date(_date.valueOf() + tzoffset)
      .toISOString()
      .slice(0, -1);
    return withoutTimezone;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Desde</TableCell>
              <TableCell>Hasta</TableCell>
              <TableCell>ISSS</TableCell>
              <TableCell>AFP</TableCell>
              <TableCell>Renta</TableCell>
              <TableCell>Bonos</TableCell>
              <TableCell>Vacaciones</TableCell>
              <TableCell>Aguinaldo</TableCell>
              <TableCell>Salario líquido</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((p) => {
              const grosserySalary =
                +p.amount + p.totalBonus + p.vacationsAmount;
              const isss = getISSS(grosserySalary);
              const afp = getAFP(grosserySalary);
              const rent = calculateRent(grosserySalary);
              const liquidSalary =
                grosserySalary - isss - afp - rent + p.aguinaldo;
              const from = new Date(
                dateWithoutTimezone(p.from)
              ).toLocaleString();
              const to = new Date(dateWithoutTimezone(p.to)).toLocaleString();

              return (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>
                    {moment(p.from).add(1, "days").format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{moment(p.to).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{USDFormat.format(isss)}</TableCell>
                  <TableCell>{USDFormat.format(afp)}</TableCell>
                  <TableCell>{USDFormat.format(rent)}</TableCell>
                  <TableCell>{USDFormat.format(p.totalBonus)}</TableCell>
                  <TableCell>{USDFormat.format(p.vacationsAmount)}</TableCell>
                  <TableCell>{USDFormat.format(p.aguinaldo)}</TableCell>
                  <TableCell>{USDFormat.format(liquidSalary)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setSelectedSalary(p)}
                    >
                      Generar boleta
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={selectedSalary != null}
        onClose={() => setSelectedSalary(null)}
      >
        <Paper
          sx={{
            backgroundColor: "#fff",
            width: "70%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            padding: "25px",
          }}
        >
          <ModalTable payment={selectedSalary!} position={position} />
        </Paper>
      </Modal>
    </>
  );
}
