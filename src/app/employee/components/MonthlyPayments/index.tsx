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

              return (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{new Date(p.from).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(p.to).toLocaleDateString()}</TableCell>
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
