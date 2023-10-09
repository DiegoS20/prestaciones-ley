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
import useUser from "@/hooks/useUser";
import ModalTable from "./ModalTable";

export default function Vacations() {
  const [openModal, setOpenModal] = useState(false);
  const vacations = useUser((s) => s.user!.vacations);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        style={{ marginBottom: "15px" }}
      >
        Agregar vacación
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Desde</TableCell>
              <TableCell>Hasta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacations.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{new Date(v.from).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(v.to).toLocaleDateString()}</TableCell>
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
          <ModalTable onVacationAdded={() => setOpenModal(false)} />
        </Paper>
      </Modal>
    </div>
  );
}
