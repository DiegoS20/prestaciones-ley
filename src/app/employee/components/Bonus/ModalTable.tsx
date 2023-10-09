"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Button, InputAdornment, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Bonus } from "@/types";
import useUser from "@/hooks/useUser";

export default function ModalTable({ onBonusCreated }: Props) {
  const [admissionDate, userId, refetchUser] = useUser(
    ({ user, refetchUser }) => [user!.admissionDate, user!.id, refetchUser]
  );
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      amount: 0,
      date: new Date(),
    },
  });

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    const fetchRes = await fetch("/api/bonus", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        userId,
      }),
    });
    const statusCode = fetchRes.status;

    const BAD_MESSAGE = "No se pudo agregar el bono";
    const GOOD_MESSAGE = "Bono agregado correctamente";

    refetchUser();
    toast(statusCode == 201 ? GOOD_MESSAGE : BAD_MESSAGE, {
      type: statusCode == 201 ? "success" : "error",
    });
    onBonusCreated();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Cantidad"
            type="number"
            required
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label="Fecha"
              value={dayjs(value)}
              onChange={(value) => onChange(value?.toDate())}
              maxDate={dayjs(new Date())}
              minDate={dayjs(admissionDate)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  style: { marginBottom: 20 },
                  error: !!error,
                  helperText: error?.message,
                  autoComplete: "off",
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
      <Button variant="contained" color="success" type="submit">
        Agregar
      </Button>
    </form>
  );
}

type FormValues = Omit<Bonus, "id" | "userId">;

type Props = {
  onBonusCreated: () => void;
};
