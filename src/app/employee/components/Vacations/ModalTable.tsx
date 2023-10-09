"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useUser from "@/hooks/useUser";

export default function ModalTable({ onVacationAdded }: Props) {
  const [admissionDate, refetchUser, userId] = useUser((s) => [
    s.user!.admissionDate,
    s.refetchUser,
    s.user!.id,
  ]);
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      from: new Date(),
      to: new Date(),
    },
  });

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    const fetchRes = await fetch("/api/vacations", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        userId,
      }),
    });
    const statusCode = fetchRes.status;

    if (statusCode == 409) {
      const data = (await fetchRes.json()) as any;
      toast(data.message, { type: "warning" });
      return;
    }

    const BAD_MESSAGE = "No se pudo agregar la vacación";
    const GOOD_MESSAGE = "Vacaciones agregadas correctamente";

    refetchUser();
    toast(statusCode == 201 ? GOOD_MESSAGE : BAD_MESSAGE, {
      type: statusCode == 201 ? "success" : "error",
    });
    onVacationAdded();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          name="from"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label="Fecha"
              value={dayjs(value)}
              onChange={(value) => onChange(value?.toDate())}
              minDate={dayjs(admissionDate)}
              maxDate={dayjs(new Date())}
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
        <Controller
          control={control}
          name="to"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label="Fecha"
              value={dayjs(value)}
              onChange={(value) => onChange(value?.toDate())}
              minDate={dayjs(watch("from"))}
              maxDate={dayjs(new Date())}
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

type FormValues = {
  from: Date;
  to: Date;
};

type Props = {
  onVacationAdded: () => void;
};
