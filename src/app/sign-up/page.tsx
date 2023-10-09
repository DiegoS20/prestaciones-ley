"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { User } from "@/types";

import LoginRegisterWrapper from "@/components/LoginRegisterWrapper";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<User>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      position: "",
      admissionDate: new Date(),
      monthlyPayment: "0",
    },
  });

  const handleFormSubmit: SubmitHandler<User> = async (data) => {
    const fetchRes = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (fetchRes.status == 201) router.push("/login");
  };

  return (
    <LoginRegisterWrapper title="Regístrate">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              fullWidth
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              {...field}
              label="Apellido"
              fullWidth
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo Electrónico"
              fullWidth
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              fullWidth
              type={showPassword ? "text" : "password"}
              required
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          control={control}
          name="position"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Puesto en el trabajo"
              required
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="admissionDate"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label="Fecha de Ingreso a la Empresa"
                value={dayjs(value)}
                onChange={(value) => onChange(value?.toDate())}
                maxDate={dayjs(new Date())}
                slotProps={{
                  textField: {
                    fullWidth: true,
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
        <Controller
          control={control}
          name="monthlyPayment"
          render={({ field }) => (
            <TextField
              {...field}
              label="Salario Mensual"
              fullWidth
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
        <Button fullWidth type="submit" variant="contained" color="primary">
          Registrar
        </Button>
      </form>
      <Link
        href="/login"
        style={{ textDecoration: "none", display: "block", marginTop: 15 }}
      >
        Iniciar sesión
      </Link>
    </LoginRegisterWrapper>
  );
}
