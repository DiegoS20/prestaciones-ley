"use client";

import { useState } from "react";
import {
  Modal,
  Paper,
  Table,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

import ModalTable from "./ModalTable";
import useUser from "@/hooks/useUser";
import { Bonus } from "@/types";

const USDFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function Bonus() {
  const [openModal, setOpenModal] = useState(false);
  const payments = useUser((s) => s.user!.payments);
  let bonuses: Bonus[] = [];
  for (const p of payments) bonuses = [...bonuses, ...p.bonuses];
  bonuses.sort((a, b) => +(a.id > b.id));

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="contained"
        style={{ marginBottom: "15px" }}
        onClick={() => setOpenModal(true)}
      >
        Agregar bono
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonuses.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.id}</TableCell>
                <TableCell>{USDFormat.format(+b.amount)}</TableCell>
                <TableCell>{new Date(b.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper
          sx={{
            backgroundColor: "#fff",
            width: 600,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            padding: "25px",
          }}
        >
          <ModalTable onBonusCreated={() => setOpenModal(false)} />
        </Paper>
      </Modal>
    </div>
  );
}
